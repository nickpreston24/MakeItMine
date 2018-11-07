var resultsArr = [];

function recipeSearch(searchParam) {
    $.ajax({
        url: `https://api.edamam.com/search?q=${searchParam}&app_id=2ff8e6f6&app_key=38d3947a3f2af312047999390586a0ad`,
        method: 'get'
    }).then(function (response) {

        console.log('Hits: ', response.hits.length);

        var results = response.hits;

        results.forEach(function (result, i) {
            let recipe = result.recipe;
            console.log("results " + recipe.label);
            console.log({
                result,
                i
            })

            console.log("recipe url" + recipe.url);
            console.log("ingredients " + recipe.ingredientLines);

            var div = $("<div>")
                .addClass("recipe-div")

            //create img tag with jquery, give it attrs src and alt, then append to recipeVar
            var imgTag = $("<img>")
                .attr("src", recipe.image)
                .attr("alt", recipe.label)

            div.append(imgTag)

            //create p tag with jquery, give it class recipe-name, set text and append to recipeVar
            var pTag = $("<p>")
                .addClass("recipe-name")
                .text(recipe.label)

            div.append(pTag)

            var url = JSON.stringify(recipe.url);
            var ingredients = JSON.stringify(recipe.ingredientLines);
            var label = JSON.stringify(recipe.label);

            console.table([{url, ingredients, label}])

            div.attr('href', url);
            div.attr('ingredients', ingredients);
            div.attr('label', label);
            div.val(recipe.label);

            //append recipeVar to #recipe-info
            $("#recipe-info").append(div)

        })

    })
};

const render = function (urlVar, ingredientVar, ) {

    $("#new-window").append(urlVar)

    let ingredientlist = JSON.parse(ingredientVar);
    console.log(ingredientlist);

    for (let val of ingredientlist) {
        $("#new-window").append(`
            <p>${val}</p>
        `);
    }

    $("#recipe-info").hide();
    $("#search-form").hide();

}

$(document).on("click", ".recipe-div", function (event) {
    console.log("render clicked");
    var target = $(event.currentTarget);
    render(target.attr("href"), target.attr("ingredients"));
})

$(document).on("click", "#recipe-search-btn", function (event) {
    event.preventDefault();

    let recipeParam = $('#recipe-search').val().trim();
    $('#recipe-search').val('');
    recipeSearch(recipeParam);
})