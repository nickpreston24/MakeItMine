// import GraphControllerBase from './base';
// import Recipe from '../../models/Recipe';

const { GraphControllerBase } = require('./base');
const Recipe = require('../models/Recipe');

class RecipesController extends GraphControllerBase {

    constructor(config) {
        super(config)
    }

    /**
     * Find a specific recipe by its Id
     * @param {*} recipeId 
     */
    findById(recipeId) {
        // TODO: type check id as number
        // console.log(`looking for recipe with id: ${recipeId}`, isNaN(recipeId), typeof (recipeId))
        const session = this.driver.session();
        const query = "MATCH (recipe:Recipe) WHERE id(recipe) = {id} \ OPTIONAL MATCH(recipe) - [:Authored_By] -> (author: Person) \ return recipe, author";

        return session
            .run(query, { id: parseInt(recipeId) })
            .then(result => {

                session.close();

                if (!result.records)
                    return null;

                let record = result.records[0];

                if (!record)
                    return null;

                const recipe = record.get('recipe');
                const author = record.get('author') || {};

                let { firstName, lastName } = author.properties || {};

                return new Recipe({
                    id: recipeId,
                    title: recipe.properties.title,
                    author: { firstName, lastName }
                });
            })
            .catch(error => {
                session.close();
                // throw error;
            });
    }

    /**
     * Gets contributors to a given recipe name or title
     * @param {*} recipeTitle 
     */
    getContributors(recipeTitle) {
        const session = this.driver.session();
        return session
            .run(
                "MATCH (recipe:Recipe {title:{title}}) \
                OPTIONAL MATCH (recipe)<-[r]-(person:Person) \
                RETURN recipe.title AS name, \
                collect([person.firstName, person.lastName]) AS author \
                LIMIT 1", { title: recipeTitle })
            .then(result => {
                session.close();

                if (!result.records)
                    return null;

                let record = result.records[0];

                return record;
            })
            .catch(error => {
                session.close();
                // throw error;
            });
    }

    /**
     * Get all recipes
     */
    get(skip = 0, take = 0, limit = 10) {
        const session = this.driver.session();
        let query = `MATCH (recipe:Recipe) return recipe, ID(recipe) as id`;

        if (skip > 0)
            query += `SKIP ${skip}`;
        if (take > 0)
            query += `TAKE ${take}`;
        if (limit > 0)
            query += `LIMIT ${limit}`;

        return session
            .run(query)
            .then(result => {
                session.close();
                if (!result.records)
                    return null;

                // Map all properties (like an ORM would):
                const recipes = result.records
                    .map(record => {
                        return new Recipe({
                            id: record.get(0).identity.low,
                            title: record.get('recipe').properties.title
                        });
                    })

                return recipes;
            })
            .catch(error => {
                session.close();
                // throw error;
            });
    }

    /**
     * Search Edamame for nutrition stats
     */
    async searchNutrition(params) {

        const query = `https://api.edamam.com/search?q=${params}&app_id=${this.appID}&app_key=${this.apiKey}`;
        const response = await fetch(query);
        const data = await response.json();
        const newRecipes = data.hits.map(hit => new Recipe({ ...hit.recipe })) || null;
        return newRecipes;
    }

    async getRecipeAuthors(recipeName) {
        let query = `MATCH (recipe:Recipe {name: ${recipeName}})
        OPTIONAL MATCH (recipe)-[:Authored_By]->(author:Person) 
        return recipe, author`

        const session = this.driver.session();

        return session
            .run(query)
            .then(result => {
                session.close();
                if (!result.records)
                    return null;

                const authors = result.records.map(record => {
                    return new Author({
                        id: record.get(0).identity.low,
                        firstName: record.get('author').properties.firstName,
                        lastName: record.get('author').properties.lastName
                    })
                })

                return authors;
            })

    }

    async updateRecipe(props) {
        const newRecipe = new Recipe(props);
        console.log('here is the updated recipe: ', newRecipe);

        let query = `MATCH (recipe:Recipe {id: ${newRecipe.id}})`;

        if (newRecipe.title)
            query += `SET recipe.title = ${newRecipe.title}`;

        const session = this.driver.session();

        return session.run(query)
            .then(result => {
                session.close();

                // if (!result.records)
                //     return null;

                // return newRecipe;
            })
    }
}

module.exports = RecipesController
