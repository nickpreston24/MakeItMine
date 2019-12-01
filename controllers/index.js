require('dotenv').config();

var config = {
    url: process.env.REACT_APP_GRAPHENEDB_BOLT_URL,
    user: process.env.REACT_APP_GRAPHENEDB_BOLT_USER,
    password: process.env.REACT_APP_GRAPHENEDB_BOLT_PASSWORD
};

const RecipesController = require('./recipes')
const recipesStore = new RecipesController(config);

module.exports = {
    recipesStore
}
