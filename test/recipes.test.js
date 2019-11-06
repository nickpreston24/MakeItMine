const { recipesController } = require('../controllers')
const recipeId = 39;
const title = 'Cannoli';

// TODO: make these mocha chai tests
let singleById = await recipesController.findById(recipeId);
let data = await recipesController.getAll();
let single = await recipesController.getRecipeContributors(title);

