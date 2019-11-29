import RecipesController from './api/recipes';

const dotenv = require('dotenv').config()
// const fs = require('fs');
// const path = require('path');

const recipesController = new RecipesController();

export {
    recipesController
}