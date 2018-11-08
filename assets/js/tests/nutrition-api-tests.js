// const nutritionAPIKey = "38d3947a3f2af312047999390586a0ad";
const nutritionAppID = "bcb4f082";
const nutritionAPIKey = "da752aa39f354e08db9030353c70bf8b";

const baseURL = "https://edamam-edamam-nutrition-analysis.p.mashape.com/api/nutrition-data?"
//sample: ingr=1+large+apple

function get(ingredient) {
    let ingredientPart = "ingr=";
    let searchText = ingredient;
    // let searchUrl = `${baseURL}${ingredientPart}${searchText}`;

    url: `https://api.edamam.com/search?q=${searchParam}&app_id=${appID}&app_key=${apiKey}`

    console.log('nutrition search url: ', searchUrl);

    $.ajax({
        url: searchUrl,
        method: 'get'
    }).then(function (response) {
        console.log('response: ', response);
    })
}

get("apple")