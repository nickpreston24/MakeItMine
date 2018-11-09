var resultsArr = [];
const apiKey = "38d3947a3f2af312047999390586a0ad";
const appID = "2ff8e6f6";
var auth = firebase.auth();
var userID;
var repo;
var currentRecipe;

/**
 * Recipe Search
 * @param {string} searchParam 
 */
function recipeSearch(searchParam) {
    $.ajax({
        url: `https://api.edamam.com/search?q=${searchParam}&app_id=${appID}&app_key=${apiKey}`,
        method: 'get'
    }).then(function (response) {

        $("#recipe-info").html('')
        var results = response.hits;

        results.forEach(function (recipe, i) {

            var recipeVar = $("<div>");
            recipeVar.addClass("recipe-div")

            //create img tag with jquery, give it attrs src and alt, then append to recipeVar
            var imgTag = $("<img>")
            imgTag.attr("src", recipe.recipe.image)
            imgTag.attr("alt", recipe.recipe.label)
            recipeVar.append(imgTag)

            //create p tag with jquery, give it class recipe-name, set text and append to recipeVar
            var pTag = $("<p>")
            pTag.addClass("recipe-name")
            pTag.text(recipe.recipe.label)
            recipeVar.append(pTag)

            var urlVar = recipe.recipe.url;
            var ingredientVar = JSON.stringify(recipe.recipe.ingredientLines);
            var labelVar = recipe.recipe.label;
            var imgSrc = recipe.recipe.image

            recipeVar.attr('href', urlVar);
            recipeVar.attr('ingredients', ingredientVar);
            recipeVar.attr('label', labelVar);
            recipeVar.attr('data-img-src', imgSrc);
            recipeVar.val(recipe.recipe.label);

            $("#recipe-info").append(recipeVar)

        })

    })
};

/**
 * Render Recipe Results
 */
const render = function (url, ingredients, label, image) {

    $("#recipe-view-name").html('');
    $("#recipe-view-img").html('');
    $("#recipe-view-instructions").html('');
    $("#recipe-view-list").html('');

    $("#recipe-view-name").append(label);
    $("#recipe-view-img").append(`
        <img src="${image}" alt="${label}">
    `);

    $("#recipe-view-instructions").append(`
        <a href=${url} target='_blank'>View Instructions</a>
    `);

    let ingredientlist = JSON.parse(ingredients);

    for (let val of ingredientlist) {
        $("#recipe-view-list").append(`
            <li>${val}</li>
        `);
    }

    $("#recipe-info").hide();
    $("#search-form").hide();
    $("#recipe-view-div").show();
    $('#back-arrow').removeClass('color-none');

}

$(document).on("click", ".recipe-div", function (event) {

    var target = $(event.currentTarget);

    let url = target.attr("href");
    let ingredients = target.attr("ingredients")
    let label = target.attr('label')
    let image = target.attr('data-img-src');

    currentRecipe = {
        name: label,
        ingredients,
        url,
        userID,
    }

    render(url, ingredients, label, image);
})

/**
 * Run Search
 */
$(document).on('click', '#recipe-search-btn', function (event) {
    event.preventDefault();

    let recipeParam = $('#recipe-search').val().trim();
    $('#recipe-search').val('');
    recipeSearch(recipeParam);
})

/**
 * Submit login
 */
$(document).on('click', '#login-form-submit', login);
$(document).on('click', '#signup-form-submit', newUser);

/**
 * Create New User
 */
async function newUser() {

    let usrEmail = document.getElementById("signup-form-email").value
    let usrPassword = document.getElementById("signup-form-password").value
    let verifyUsrPassword = document.getElementById("signup-form-password-confirm").value

    if (verifyUsrPassword === usrPassword) {
        auth.createUserWithEmailAndPassword(usrEmail, usrPassword)
            .then(function (result) {
                userID = result.user.uid;
                repo = new recipeRepo(userID);
                removeSignupModal();
            })
            .catch(function (error) {

                var errorCode = error.code;
                var errorMessage = error.message;

                window.alert(`${errorMessage} error code: ${errorCode}`);
            });
    } else {
        window.alert('Passwords Do Not Match');
    };

}

/**
 * Login the User
 */
function login() {

    let usrEmail = document.getElementById("login-form-email").value
    let usrPassword = document.getElementById("login-form-password").value

    document.getElementById("login-form-email").value = '';
    document.getElementById("login-form-password").value = '';

    auth.signInWithEmailAndPassword(usrEmail, usrPassword)
        .then(function (result) {

            let {
                uid
            } = result.user;

            userID = uid;
            repo = new recipeRepo(userID);
            removeLoginModal();
        })
        .catch(function (error) {

            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert(`${errorMessage} error code: ${errorCode}`);
        });
}

/**
 * Log Out a User
 */
function logout() {
    auth.signOut();
}

function update(recipe) {
    console.log('repo: ', repo);
    if (!repo) repo = new recipeRepo(userID);
    console.log('amending recipe: ', recipe);
    repo.amend(recipe).then(result => console.log('amend success!', result));
}