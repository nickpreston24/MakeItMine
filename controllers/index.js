// console.log('api key', process.env.REACT_APP_EDAMAME_APIKEY);
// console.log('app id', process.env.REACT_APP_EDAMAME_APPID);
require('dotenv').config();

var config = {
    url: process.env.REACT_APP_GRAPHENEDB_BOLT_URL,
    user: process.env.REACT_APP_GRAPHENEDB_BOLT_USER,
    password: process.env.REACT_APP_GRAPHENEDB_BOLT_PASSWORD
};

// import RecipesController from './api/recipes';
console.log('config from env: ', config)
const RecipesController = require('./recipes')
const recipesController = new RecipesController(config);
// console.log(recipesController);

module.exports = {
    recipesController
}
