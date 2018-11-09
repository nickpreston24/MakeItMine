/*	Author: Michael Preston
 *	Created Date: "11-04-2018"
 */

/**
 * This DAL is the main access point of our database.
 * This file provides specialized Repository-like functions for our app logic.
 */

// firebase imports & inits
var config = {
    apiKey: "AIzaSyB7ajqUKuTWs5Co6c10QSNdHJrG6zruIgw",
    authDomain: "make-it-mine.firebaseapp.com",
    databaseURL: "https://make-it-mine.firebaseio.com",
    projectId: "make-it-mine",
    storageBucket: "make-it-mine.appspot.com",
    messagingSenderId: "373815431363"
};

const userIDWarning = 'recipe must have a valid UserID!';
const userRecipesPath = '/user-recipes/'; //>> recipes is a public collection.
const recipesPath = '/recipes/'; //>> user-recipes is an index of users -> recipe.

firebase.initializeApp(config);

class recipeRepo {

    constructor(userID) {

        if (!userID) throw Error('given userID cannot be null!');

        this.userID = userID;
        this.db = firebase.database();
        this.root = this.db.ref();
        this.recipes = this.db.ref(recipesPath);
        this.userRecipes = this.db.ref(userRecipesPath);

    }

    /**
     * Seeds recipe data for testing
     * todo: remove this function when pushing to prod/master
     */
    seed() {

        this.recipes.remove();
        this.userRecipes.remove();

        var seedData = {
            name: "fireball sushi",
            ingredients: ["mahi-mahi", "sriracha sauce", "muenster cheese", "pepper", "rice vinegar", "soy sauce", "sushi rice"],
            directions: `            
            The key to great sushi is the rice.Wash the rice with fresh water until water runs clear, this may take 5 to 6 rinsings.Add rice to pot and cook, a one to one ratio of rice and water is best.Once rice has cooked transfer to a bowl to cool, mix vinegar and sugar then mix with rice.
            Beat egg and fry in a greased pan similar to a thin omelet.Slice carrot and egg into long thin strips.A bamboo sushi roller is nice to have but you can substitute wax paper or clear plastic wrap
            for rolling the rolls.Lay the nori out on the roller with the lines in the direction you plan on rolling up the sushi.Place a¼ in .layer of rice on¾ of the nori leaving the top and bottom edges free from rice.Next place the fish in the middle then add two strips of egg and carrots top with cilantro or basil.To roll the sushi use both hands taking the edge closest to you up so the rice meets leaving the rice free edges of nori to complete the roll.Place completed roll in refrigerator
            while rolling remaining sushi rolls.To get an inside out sushi roll layer the rice on a sheet of wax paper the same size as listed above.Cut one sheet of nori length wise in half and place in middle of rice.Then add fish, egg, carrots and basil or cilantro and roll up as stated above.Take the roll and roll in a plate or cookie sheet covered with the roasted sesame seeds.
            Use a sharp knife to slice½ in .thick sushi rolls and arrange on serving plate.Garnish with the pickled ginger and soy sauce.The proper way to serve the soy sauce is with the wasabi pinched with your thumb and two fingers into a shape resembling Mt.Fuji.
            `,

            userID: testUID
        };

        var newRecipeKey = this.recipes.push().key;

        return this.performUpdates(newRecipeKey, seedData);
    }

    /**
     * Writes a new recipe from finished recipe 
     * (checks recipe contains nulls)
     * @param {*} recipe 
     */
    add(recipe) {

        if (!this.userID)
            throw Error(userIDWarning);

        if (hasNull(recipe))
            throw Error('recipe cannot have null values!');

        var newRecipeKey = this.recipes.push().key;

        return this.performUpdates(newRecipeKey, recipe);
    }

    /**
     * Writes a new recipe from its pieces
     * @param {*} name 
     * @param {*} ingredients 
     * @param {*} directions 
     */
    write(name, ingredients, directions, starred) {

        if (!this.userID)
            throw Error(userIDWarning);

        if (!Array.isArray(ingredients))
            ingredients = [ingredients];

        var recipeData = {
            userID: this.userID,
            name,
            ingredients,
            directions,
            starred,
        }

        this.add(recipeData);
    }

    /**
     * Writes a new recipe from its pieces
     * @param {*} newRecipeKey 
     * @param {*} recipe 
     */
    performUpdates(newRecipeKey, recipe) {

        var updates = {};
        updates[recipesPath + newRecipeKey] = recipe;
        updates[`${userRecipesPath}${this.userID}/${newRecipeKey}`] = recipe.name;

        return this.root.update(updates);
    }

    /**
     * Find recipe by unique id
     * Should only get ONE back
     * @param {*} uniqueId 
     */
    async find(uniqueId) {

        if (!this.userID)
            throw Error(userIDWarning);

        var recipePromise = new Promise(function (resolve, reject) {
            this.recipes.child(uniqueId).once("value").then(function (snapshot) {
                const data = snapshot.val();
                data ? resolve(data) : reject(`recipe with id ${uniqueId} not found!`);
            })
        })

        return await recipePromise;
    }

    /**
     * Get all or return filtered by predicate, e.g.x => x > 10
     * This is our search function
     * @param {*} predicate 
     */
    async get(predicate) {

        if (!this.userID)
            throw Error(userIDWarning);

        var that = this;

        var recipePromise = new Promise(function (resolve, reject) {
            that.recipes.once("value").then(function (snapshot) {
                const data = snapshot.val();
                data ? resolve(data) : reject("recipes not found!")
            })
        })

        var result = await recipePromise;
        var entries = Object.entries(result).map(e => e[1]);
        result = null;

        return predicate ? entries.filter(predicate) : entries;
    }

    /**
     * Ammend recipes
     * Find this recipe, if it exists and update it.
     * 
     * @param {*} recipe 
     */
    async amend(recipe) {

        if (!this.userID)
            throw Error(userIDWarning);

        var that = this;

        var updatePromise = new Promise(function (resolve, reject) {
            that.userRecipes.child(that.userID).once("value").then(function (snapshot) {
                const data = snapshot.val();
                data ? resolve(data) : reject(`user-recipe of id ${that.userID} not found!`);
            })
        })

        var result = await updatePromise;
        var entries = Object.entries(result).map(e => e);
        var recipeId = entries.filter(e => e[1] === recipe.name).map(e => e[0])[0];

        this.performUpdates(recipeId, recipe);
    }

    /**
     * Deletes recipes by content
     * (removes recipeId from user's set of recipes as well)
     * @param {*} recipe 
     */
    async remove(recipe) {

        if (!this.userID)
            throw Error(userIDWarning);

        throw new Error("Not implemented!");
    }
}

function hasNull(target) {
    for (var member in target) {
        if (target[member] == null)
            return true;
    }
    return false;
}