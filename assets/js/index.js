var resultsArr = [];

function recipeSearch(searchParam) {
    $.ajax({
        url: `https://api.edamam.com/search?q=${searchParam}&app_id=2ff8e6f6&app_key=38d3947a3f2af312047999390586a0ad`,
        method: 'get'
    }).then(function (response) {

        // console.log(response.hits.length);
        $("#recipe-info").html('')
        var results = response.hits;


        results.forEach(function (recipe, i) {
            // console.log("results " + recipe.recipe.label);
            // console.log({
                // recipe,
                // i
            // })




            // console.log("recipe " + recipe.recipe.url);
            // console.log("ingredients " + recipe.recipe.ingredientLines);

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



            //append recipeVar to #recipe-info
            
            $("#recipe-info").append(recipeVar)



        })



    })
};

const render = function(urlVar, ingredientVar, nameVar, imgVar){
    // console.log(JSON.parse(urlVar));
    $("#recipe-view-name").html('');
    $("#recipe-view-img").html('');
    $("#recipe-view-instructions").html('');
    $("#recipe-view-list").html('');

    $("#recipe-view-name").append(nameVar);
    $("#recipe-view-img").append(`
        <img src="${imgVar}" alt="${nameVar}">
    `);

    $("#recipe-view-instructions").append(`
        <a href=${urlVar} target='_blank'>View Instructions</a>
    `);
  
    let ingredientlist = JSON.parse(ingredientVar);
    // console.log(ingredientlist);

    for (let val of ingredientlist) {
        $("#recipe-view-list").append(`
            <li>${val}</li>
        `);
    }
    // console.log(ingredientVar);
    $("#recipe-info").hide();
    $("#search-form").hide();
    $("#recipe-view-div").show();
    $('#back-arrow').removeClass('color-none');

}

$(document).on("click",".recipe-div", function(event){
    // console.log("render clicked");
    var target = $(event.currentTarget);
    render(target.attr("href"), target.attr("ingredients"), target.attr('label'), target.attr('data-img-src'));
})


$(document).on('click', '#recipe-search-btn', function (event) {
    event.preventDefault();

    let recipeParam = $('#recipe-search').val().trim();
    $('#recipe-search').val('');
    recipeSearch(recipeParam);
})
// ------New User and Login JS here ------//
function newUser() {
    
    let usrEmail = document.getElementById("signup-form-email").value
    let usrPassword = document.getElementById("signup-form-password").value
    let verifyUsrPassword = document.getElementById("signup-form-password-confirm").value

    if (verifyUsrPassword === usrPassword) {
        firebase.auth().createUserWithEmailAndPassword(usrEmail, usrPassword).catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            window.alert(errorMessage);
        });
    } else {
        window.alert('Passwords Do Not Match');
    };



}



function login() {
    // alert('you clicked');
    let usrEmail = document.getElementById("login-form-email").value
    let usrPassword = document.getElementById("login-form-password").value

    document.getElementById("login-form-email").value = '';
    document.getElementById("login-form-password").value = '';

    firebase.auth().signInWithEmailAndPassword(usrEmail, usrPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert(`${errorMessage} 
        error code: ${errorCode}`);
    });
}

function logout() {
    firebase.auth().signOut();
}
