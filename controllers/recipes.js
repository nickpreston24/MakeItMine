const { Recipe, Author } = require('../models');
const BaseController = require('./base');

class RecipesController extends BaseController {

    /**
     * Find a specific recipe by its Id
     * @param {*} id 
     */
    async findById(id, includeAuthors = false) {

        const session = this.driver.session();
        let query = `MATCH (recipe:Recipe) WHERE id(recipe) = ${id} `;

        query += !includeAuthors
            ? `return recipe`
            : `OPTIONAL MATCH(recipe)-[:Authored_By]->(author: Person) \ return recipe, author`;

        return session
            .run(query, { id: parseInt(id) })
            .then(result => {

                session.close();
                // console.log(result)
                if (!result.records)
                    return null;

                let record = result.records[0];

                if (!record)
                    return null;

                const recipe = record.get('recipe');
                const author = new Author(includeAuthors ? record.get('author') : {});

                // let { firstName, lastName } = author.properties || {};

                return new Recipe(
                    id,
                    recipe.properties.title,
                    author
                );
            })
            .catch(error => {
                session.close();
                throw error;
            });
    }

    async create(recipe) {

        const session = this.driver.session();
        // console.log('creating recipe: ', recipe);
        const { title, ingredients, instructions } = recipe;

        return session.run(
            `MERGE (recipe:Recipe {title: $title, ingredients: $ingredients}) \
            return recipe`, { title, ingredients, instructions })
            .then(result => {

                session.close();

                if (!result.records)
                    return null;

                let record = result.records[0];

                return new Recipe(
                    parseInt(record.get(0).identity.low),
                    record.get('recipe').properties.title
                );
            })
            .catch(error => {
                session.close();
                throw error;
            });

    }

    /**
     * Gets contributors to a given recipe name or title
     * @param {*} title 
     */
    async getContributors(title) {
        const session = this.driver.session();

        return session
            .run(
                "MATCH (recipe:Recipe {title: $title}) \
                OPTIONAL MATCH (recipe)<-[r]-(person:Person) \
                RETURN recipe.title AS name, \
                collect([person.firstName, person.lastName]) AS author \
                LIMIT 1", { title })
            .then(result => {
                session.close();

                if (!result.records)
                    return null;

                let record = result.records[0];

                return record;
            })
            .catch(error => {
                session.close();
                throw error;
            });
    }

    /**
     * Get all recipes
     */
    async get(skip = 0, take = 0, limit = 10) {
        const session = this.driver.session();
        let query = `MATCH (recipe:Recipe) return recipe, ID(recipe) as id `;

        if (skip > 0)
            query += `SKIP ${skip}`;
        if (take > 0)
            query += `TAKE ${take}`;
        if (limit > 0)
            query += `LIMIT ${limit}`;

        console.log('query: ', query)

        return session
            .run(query)
            .then(result => {
                session.close();

                // console.log('result', result);

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
                throw error;
            });
    }

    deletionModeMap = {
        nodesOnly: ` delete `,
        relationshipsOnly: `-[r:*]->() \ delete`,
        all: ` detach delete `
    }

    async delete(id, mode = 'all') {
        // console.log('id to delete: ', id)

        let query = `MATCH (r:Recipe {id: $id})`
        query += this.deletionModeMap[mode] + " r";

        const session = this.driver.session();

        return session
            .run(query, { id })
            .then(result => {
                session.close();

                console.log('Query: ', query)

                // if (!result.records)
                //     return null;

                // let record = result.records[0];

                // return record;
            })
            .catch(error => {
                session.close();
                throw error;
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
                    return new Author(
                        record.get(0).identity.low,
                        record.get('author').properties.firstName,
                        record.get('author').properties.lastName
                    )
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


    async sampleTransaction() {

        const session = this.driver.session();

        var promise = session.readTransaction(transaction => {
            var result = transaction.run(
                'MATCH (recipe:Recipe {title: $title}) return recipe.title',
                { title: 'Cannoli' }
                // 'MATCH (person:Person) RETURN person.name AS name'
            );
            return result;
        })

        promise.then(result => {
            // session.close();
            this.driver.close();
            console.log(result.records);
        }).catch(console.error)
    }


    async sampleQuery() {

        const session = this.driver.session();

        const personName = 'Joan';
        const resultPromise = session.run(
            'CREATE (a:Person {name: $name}) RETURN a',
            { name: personName }
        );

        resultPromise.then(result => {
            session.close();


            console.log(result, result.records)

            const singleRecord = result.records[0];
            const node = singleRecord.get(0);

            console.log(node.properties.title);

            // on application exit:
            this.driver.close();
        });

    }
}

module.exports = RecipesController
