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
    storageBucket: "",
    messagingSenderId: "373815431363"
};

firebase.initializeApp(config);

/**
 * Stubs
 */

let recipeRepo = class {

    constructor() {
        this.db = firebase.database();
        this.recipes = this.db.ref('recipes');
    }

    //seed test data
    seed() {

    }


    //Find recipe by unique id:
    find(uniqueId) {
        return this.recipes.once("value");
    }

    //Get all recipes
    getAll() {
        return [{}];
    }

    //get all, and return filtered by predicate
    // x=>x>10
    get(predicate) {
        return "test"
    }

    //New recipes:
    add(recipe) {
        //update to update Users as well:
        this.recipes.push(recipe).catch(console.error)
    }

    //Ammended recipes
    update(recipe) {
        //find this recipe, if it exists and update it.
        // let recipeRef = this.recipes.child(recipe.name).once("value").then((result) => {
        //     recipeRef.update(recipeRef.key).catch(console.error);
        // });
    }

    //delete recipe by content (removes recipeId from user's set of recipes as well)
    remove(recipe) {

    }
}

/**
 * Tests
 * Uncomment to use individual tests as part of the pre-loaded JS.
 */


let repo = new recipeRepo();

repo.add({
    name: "chicken marsalla",
    ingredients: ["chicken", "sause", "cheese"],
    prepTime: "00:30",
    cookTime: "01:30",
});

repo.update({
    name: "chicken marsalla",
    ingredients: ["chicken", "sause", "cheese"],
    prepTime: "00:25",
    cookTime: "01:23",
})

console.log('recipes: ', repo.get());