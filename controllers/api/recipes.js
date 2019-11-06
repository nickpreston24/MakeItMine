import Recipe from '../../models/Recipe';

export default class RecipesController {

    constructor() {
        this.uri = "bolt://localhost";
        this.user = "neo4j";
        this.password = 'root';
        this.neo4j = require('neo4j-driver').v1;
        this.driver = this.neo4j.driver(this.uri, this.neo4j.auth.basic(this.user, this.password));
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

                // console.log('result: ', result)
                
                if (!result.records)
                    return null;

                // console.log('found recipe: ', record)

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
                throw error;
            });
    }

    /**
     * Gets contributors to a given recipe name or title
     * @param {*} recipeTitle 
     */
    getRecipeContributors(recipeTitle) {
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
                throw error;
            });
    }

    getAll() {
        const session = this.driver.session();
        const query = "MATCH (recipe:Recipe) return recipe, ID(recipe) as id LIMIT 10";
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

                // console.log('records queried', recipes);
                return recipes;
            })
            .catch(error => {
                session.close();
                throw error;
            });
    }

    runSampleQuery() {
        const session = this.driver.session();

        // Run a Cypher statement, reading the result in a streaming manner as records arrive:
        session
            .run('MERGE (alice:Person {firstName : $_name}) RETURN alice.firstName AS name', {
                _name: 'Alice'
            })
            .subscribe({
                onKeys: keys => {
                    console.log(keys)
                },
                onNext: record => {
                    console.log(record.get('name'))
                },
                onCompleted: () => {
                    session.close() // returns a Promise
                },
                onError: error => {
                    console.log(error)
                }
            })

        /**
         * Alternative sample code
         */

        // //Get a person: 
        // const personName = 'Alice';
        // const resultPromise = session.run(
        //     'merge (a:Person {name: $name}) RETURN a',
        //     { name: personName }
        // );

        // resultPromise.then(result => {
        //     session.close();

        //     const singleRecord = result.records[0];
        //     const node = singleRecord.get(0);

        //     console.log(node.properties.name);

        //     // on application exit:
        //     driver.close();
        // });
    }

}

