var resultsArr = [];
const apiKey = "38d3947a3f2af312047999390586a0ad";
const appID = "2ff8e6f6";
var auth = firebase.auth();
var userID;

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
const render = function (urlVar, ingredients, label, image) {

    $("#recipe-view-name").html('');
    $("#recipe-view-img").html('');
    $("#recipe-view-instructions").html('');
    $("#recipe-view-list").html('');

    $("#recipe-view-name").append(label);
    $("#recipe-view-img").append(`
        <img src="${image}" alt="${label}">
    `);

    $("#recipe-view-instructions").append(`
        <a href=${urlVar} target='_blank'>View Instructions</a>
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
    console.log("render clicked");
    var target = $(event.currentTarget);
    render(target.attr("href"), target.attr("ingredients"), target.attr('label'), target.attr('data-img-src'));
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

/**
 * Create New User
 */
function newUser() {

    let usrEmail = document.getElementById("signup-form-email").value
    let usrPassword = document.getElementById("signup-form-password").value
    let verifyUsrPassword = document.getElementById("signup-form-password-confirm").value

    if (verifyUsrPassword === usrPassword) {
        auth.createUserWithEmailAndPassword(usrEmail, usrPassword).catch(function (error) {

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