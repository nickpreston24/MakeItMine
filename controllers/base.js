const Connection = require('./connection');

/**
 * A base controller that runs neo4j queries as transactions.
 */
class BaseController {
    constructor(config) {
        this.driver = new Connection(config).driver;
    }

    //Inspiration: https://neo4j.com/docs/api/javascript-driver/current/
    async transact(queries = [], params = {}) {
        if (queries.length === 0)
            return new Error("Nothing to do.");

        var session = this.driver.session();
        var transaction = session.beginTransaction();

        queries.forEach(query =>
            transaction.run(query, params)
                .subscribe({
                    onNext: (record) => console.log(Object.keys(params).map(key => record.get(key))),
                    onCompleted: () => console.log(`Completed query ${query}`),
                    onError: (error) => console.log(error)
                }))

        //TODO: Be sure to set this to true when successful, else this will always skip commit.
        var success = false;

        if (success) {
            tx.commit()
                .subscribe({
                    onCompleted: function () {
                        // this transaction is now committed and session can be closed
                        session.close();
                    },
                    onError: function (error) {
                        console.log(error);
                    }
                });
        } else {
            //transaction is rolled black and nothing is created in the database
            console.log('rolled back');
            tx.rollback();
        }
    }

    // async run(query, params = {}) {
    //TODO: implement as a normal non-transaction?
    // }

    /**
     * Closes driver on app close and should be called during tests
     */
    dispose() {
        this.driver.close();
    }
}

module.exports = BaseController;