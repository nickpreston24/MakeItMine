const assert = require('assert');
const expect = require('chai').expect;
const { recipesStore } = require('../controllers')
const { Recipe, User, Author } = require('../models');

describe('Validate Domain Models', function () {
    it('Should validate all models as inter-compatible', async function (done) {

        const recipe = new Recipe(37, "Mac N' Cheez", ["Elbow Pasta", "melted cheez"]);
        const user = new User(42, 'Michael', 'Preston');
        const author = new User(22, 'Braden', 'Preston');

        console.log('recipe:', recipe, 'user:', user, 'author:', author);

        isValidRecipe(recipe);
        isValidUser(user);
        isValidAuthor(author);

        done();

    });

})

describe('Find Recipe by Id', function () {
    it('Should find a Recipe by its Id', async () => {

        const newRecipe = new Recipe(null, "Mac N' Cheez", ["Elbow Pasta", "melted cheez"]);
        const result = await recipesStore.create(newRecipe);
        const id = result.id;

        let recipe = await recipesStore.findById(id)
        console.log('found this recipe: ', recipe)

        isValidRecipe(recipe);

        await recipesStore.delete(id);

        recipesStore.dispose();
    });
})


describe('Find Contributors of a Recipe', function () {
    it('Should find contributors of a recipe', async function () {
        const newRecipe = new Recipe(null, "Mac N' Cheez", ["Elbow Pasta", "melted cheez"]);
        const result = await recipesStore.create(newRecipe);
        const { title } = result;

        let author = await recipesStore.getContributors(title);
        console.log('Found this author: ', author)

        // isValidAuthor(author);
    });
})

describe('Get all recipes', function () {
    it('Should get all recipes', async () => {

        let recipes = await recipesStore.get();
        recipesStore.dispose();

        expect(recipes).to.not.be.null;
        expect(recipes.length).to.be.greaterThan(0);

        recipes.map(recipe => isValidRecipe(recipe))
    })
})

recipesStore.dispose();

function isValidAuthor(author) {
    isValidUser(author)
}

function isValidUser(user) {
    expect(user).to.be.a('object');
    expect(user).to.not.be.null;
    expect(user).to.have.property('id').not.null;
    expect(user).to.have.property('name').not.null;
    expect(user).to.have.property('firstName').not.null;
    expect(user).to.have.property('lastName').not.null;
}

function isValidRecipe(recipe) {
    expect(recipe).to.be.a('object');
    expect(recipe).to.not.be.null;
    expect(recipe).to.have.property('id').not.null;
    expect(recipe).to.have.property('title').not.null;
    expect(recipe).to.have.property('ingredients').not.null;
}
