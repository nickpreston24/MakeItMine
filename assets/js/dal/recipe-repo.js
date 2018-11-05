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

var recipeDB = function () {

    //Find recipe by unique id:
    recipeDB.prototype.find = function (uniqueId) {
        return {};
    }

    //Get all recipes
    recipeDB.prototype.get = function () {
        return [{}];
    }
}




/**
 * Tests
 * Uncomment to use individual tests as part of the pre-loaded JS.
 */