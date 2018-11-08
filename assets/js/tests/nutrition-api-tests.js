const apiKey = "38d3947a3f2af312047999390586a0ad";

const baseURL = "https://edamam-edamam-nutrition-analysis.p.mashape.com/api/nutrition-data?"
//sample: ingr=1+large+apple

function get(ingredient) {
    let ingredientPart = "ingr=";
    let searchText = ingredient;
    let searchUrl = `${baseURL}${ingredientPart}${searchText}`;


    $.ajax({
        url: searchUrl,
        method: 'get'
    }).then(function (response) {
        console.log('response: ', response);
    })
}