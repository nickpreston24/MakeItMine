function recipeSearch(searchParam) {
    $.ajax({
        url: `https://api.edamam.com/search?q=${searchParam}&app_id=2ff8e6f6&app_key=38d3947a3f2af312047999390586a0ad`,
        method: 'get'
    }).then(function (response) {
        for (let val of response.hits) {
            console.log(val.recipe.label);
            $('#recipe-info').append(`
                <div class="recipe-div">
                    <p class='recipe-name'>${val.recipe.label}</p>
                </div>
             `);
            for (let ing of val.recipe.ingredientLines) {
                
                $('#recipe-info').append(`
                <ul class="recipe-ingredients">
                    <li>
                        ${ing}
                    </li>
                </ul>
            `);



            }



        }
    })
}

$(document).on('click', '#recipe-search-btn', function (event) {
    event.preventDefault();

    let recipeParam = $('#recipe-search').val();
    recipeSearch(recipeParam);
})