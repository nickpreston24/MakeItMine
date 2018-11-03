var resultsArr=[];

function recipeSearch(searchParam) {
    $.ajax({
        url: `https://api.edamam.com/search?q=${searchParam}&app_id=2ff8e6f6&app_key=38d3947a3f2af312047999390586a0ad`,
        method: 'get'
        }).then(function (response) {

            // console.log(response.hits);

            var results= response.hits;

            
            results.forEach(function (recipe, i){
                // console.log("results " + recipe.recipe.label);
                // console.log({recipe,i})
                

    

                // console.log("recipe "+ recipe.recipe.url);
                // console.log("ingredients "+ recipe.recipe.ingredientLines);
        
                var recipeVar= $("<div>");
                recipeVar.addClass("recipe-div")

                //create img tag with jquery, give it attrs src and alt, then append to recipeVar
                var imgTag = $("<img>")
                imgTag.attr("src",recipe.recipe.image)
                imgTag.attr("alt",recipe.recipe.label)
                recipeVar.append(imgTag)

                //create p tag with jquery, give it class recipe-name, set text and append to recipeVar
                var pTag= $("<p>")
                pTag.addClass("recipe-name")
                pTag.text(recipe.recipe.label)
                recipeVar.append(pTag)

                var urlVar = JSON.stringify(recipe.recipe.url);
                // console.log(urlVar);
                var ingredientVar = JSON.stringify(recipe.recipe.ingredientLines);
                // console.log(ingredientVar);
                var labelVar = JSON.stringify(recipe.recipe.label);
                // console.log(labelVar);
                
                
                recipeVar.attr('href', urlVar);
                recipeVar.attr('ingredients', ingredientVar);
                recipeVar.attr('label',labelVar);
                recipeVar.val(recipe.recipe.label);

                // console.log(recipeVar);



                //append recipeVar to #recipe-info
                $("#recipe-info").append(recipeVar)

                
                
            })
        
        

})};

const render = function(urlVar, ingredientVar,){
    // console.log(JSON.parse(urlVar));
    $("#new-window").append(JSON.parse(urlVar))
  
    let ingredientlist = JSON.parse(ingredientVar);
    console.log(ingredientlist);

    for (let val of ingredientlist) {
        $("#new-window").append(`
            <p>${val}</p>
        `);
    }
    // console.log(ingredientVar);
	$("#recipe-info").hide();

}

$(document).on("click",".recipe-div", function(event){
    console.log("render clicked");
    var target = $(event.currentTarget);
    render(target.attr("href"), target.attr("ingredients"));
})

$(document).on('click', '#recipe-search-btn', function (event) {
  event.preventDefault();

  let recipeParam = $('#recipe-search').val().trim();
  $('#recipe-search').val('');
  recipeSearch(recipeParam);
})