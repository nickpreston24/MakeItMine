/*	Author: Michael Preston
 *	Created Date: "11-04-2018"
 */

/**
 * This DAL is the main access point of our database.
 * This file provides specialized Repository-like functions for our app logic.
 */

const testUID = "fUEW2E8w94PmgMks6GIoRPnl9N03" //todo: remove before code freeze.

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

let recipeRepo = class {

    constructor() {

        this.db = firebase.database();
        this.root = this.db.ref();

        this.recipes = this.db.ref('recipes');
        this.userRecipes = this.db.ref('user-recipes');

        this.seed() //dev-only, todo: delete after freeze
    }

    seed() {

        this.recipes.remove();
        this.userRecipes.remove();

        let seedData = {
            name: "fireball sushi",
            ingredients: ["mahi-mahi", "sriracha sauce", "muenster cheese", "pepper", "rice vinegar", "soy sauce", "sushi rice"],
            directions: `            
            The key to great sushi is the rice.Wash the rice with fresh water until water runs clear, this may take 5 to 6 rinsings.Add rice to pot and cook, a one to one ratio of rice and water is best.Once rice has cooked transfer to a bowl to cool, mix vinegar and sugar then mix with rice.
            Beat egg and fry in a greased pan similar to a thin omelet.Slice carrot and egg into long thin strips.A bamboo sushi roller is nice to have but you can substitute wax paper or clear plastic wrap
            for rolling the rolls.Lay the nori out on the roller with the lines in the direction you plan on rolling up the sushi.Place a¼ in .layer of rice on¾ of the nori leaving the top and bottom edges free from rice.Next place the fish in the middle then add two strips of egg and carrots top with cilantro or basil.To roll the sushi use both hands taking the edge closest to you up so the rice meets leaving the rice free edges of nori to complete the roll.Place completed roll in refrigerator
            while rolling remaining sushi rolls.To get an inside out sushi roll layer the rice on a sheet of wax paper the same size as listed above.Cut one sheet of nori length wise in half and place in middle of rice.Then add fish, egg, carrots and basil or cilantro and roll up as stated above.Take the roll and roll in a plate or cookie sheet covered with the roasted sesame seeds.
            Use a sharp knife to slice½ in .thick sushi rolls and arrange on serving plate.Garnish with the pickled ginger and soy sauce.The proper way to serve the soy sauce is with the wasabi pinched with your thumb and two fingers into a shape resembling Mt.Fuji.
            `,
            prepTime: "00:15",
            cookTime: "00:30",
            userID: testUID
        };

        // let key = this.recipes.push().key
        // this.recipes.update(seedData);


        let newRecipe = this.recipes.push().key;

        console.log('new reciped id: ', newRecipe);

        var updates = {};
        updates['/recipes/' + newRecipe] = seedData;
        updates[`/user-recipes/${testUID}/${newRecipe}`] = newRecipe;

        this.root.update(updates);
    }

    //Writes a new recipe from finished recipe (checks if null)
    add(recipe) {

        if (!recipe.uid)
            throw Error('recipe must have a valid UserID!');

        //todo: check for all nulls, exit and warn when one exists!

        let newRecipeKey = this.recipes.push().key;
        var updates = {};

        updates['/recipes/' + newRecipeKey] = recipe;
        //update Users as well:
        updates[`/user-recipes/${recipe.uid}/${newRecipeKey}`] = newRecipeKey;

        return this.root.update(updates);
    }

    //Writes a new recipe from its pieces
    write(uid, recipeName, ingredientsList, directions) {

        if (!uid)
            throw Error('User ID could not be found!  Aborting write..');

        var recipeData = {
            userID: uid,
            recipeName,
            ingredients: ingredientsList.join(','),
            directions,
        }

        this.write(recipeData);
    }

    //Find recipe by unique id:
    find(uniqueId) {
        return this.recipes.child(uniqueId).once("value");
    }

    ///Get all or return filtered by predicate, e.g. x=>x>10
    ///This is our search function
    async get(predicate) {

        let recipePromise = new Promise((resolve, reject) => {
            this.recipes.once('value').then(function (snapshot) {
                const data = snapshot.val();
                console.log('recipes result: ', data);
                data ? resolve(data) : reject("recipes not found!")
            })
        })

        let result = await recipePromise;

        // result.forEach(element => {
        // for (var key in result) {
        //     if (result.hasOnwProperty(key)) {

        //     }
        // }

        let entries = Object.entries(result);
        console.log('entries: ', entries);
        console.log('times', entries.map(e => e.val));

        // console.log('element: ', r);
        // });
        // console.log('result:', result);
        // console.log('result.key:', result[0]);
        // console.log('predicate: ', result.key.filter(r => predicate(r)));

        return result;

        // let result = async () => {
        //     let b = await this.recipes.once('value');
        //     return b
        // }
        // let a = eval(result)

        // .filter(r => predicate(r));
        // return predicate ?
        //     //with
        //     : //without

        // return a;
    }

    //Ammended recipes
    update(recipe) {

        //todo: find this recipe, if it exists and update it.
        //  >> using this recipes' uid, find the associated user, then find that recipe under user-recipes.
        //  >> recipes is a public collection.
        //  >> user-recipes is an index of users -> recipe.

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

let recipe = {
    name: "chicken marsalla",
    ingredients: ["chicken", "sause", "cheese"],
    prepTime: "00:30",
    cookTime: "01:30",
};

recipe.uid = testUID;
repo.add(recipe);

recipe = {
    name: "chicken marsalla",
    ingredients: ["tofu-chicken", "sause", "cheese"],
    prepTime: "00:25",
    cookTime: "01:23",
};

repo.update(recipe);

repo.get(r => r.name != "fireball sushi").then(r => console.log(r));

/**
 * sample from the docs
 */

// function writeNewPost(uid, username, picture, title, body) {
//     // A post entry.
//     var postData = {
//         author: username,
//         uid: uid,
//         body: body,
//         title: title,
//         starCount: 0,
//         authorPic: picture
//     };

//     // Get a key for a new Post.
//     var newPostKey = firebase.database().ref().child('posts').push().key;

//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     var updates = {};
//     updates['/posts/' + newPostKey] = postData;
//     updates['/user-posts/' + uid + '/' + newPostKey] = postData;

//     return firebase.database().ref().update(updates);
// }