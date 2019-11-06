export default class RecipesController {
    constructor() {
        console.log('Running in the constructor!');

        const uri = "bolt://localhost";
        const user = "neo4j";
        const password = 'root';
        const neo4j = require('neo4j-driver').v1;
        const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
        const session = driver.session();

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
    }
    find({ userId }) {
        if (userId) {

        }

        else {
            `match (r) return r`;
        }
    }
}


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