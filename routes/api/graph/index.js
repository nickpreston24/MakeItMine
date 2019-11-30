const router = require('express').Router();

const recipes = require('./recipes');
const authors = require('./authors');

router.use("/recipes", recipes);
router.use("/authors", authors);

module.exports = router;