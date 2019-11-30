class GraphControllerBase {
    constructor(...config) {

        console.log('config: ', config)
        if (config && config.length > 0 && !config.every(prop => !!prop)) {
            console.log('using config...')
            Object.assign(this, ...config)
        }
        else {
            console.log('using defaults...')
            this.url = "bolt://localhost";
            this.user = "neo4j";
            this.password = "root";
        }

        this.neo4j = require('neo4j-driver').v1;

        console.log('credentials: ', this.url, this.user, this.password)

        // this.driver = this.neo4j.driver(this.url, this.neo4j.auth.basic(this.user, this.password));
    }
}

module.exports = {
    GraphControllerBase
}