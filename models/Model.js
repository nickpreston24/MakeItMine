/** Base domain model class
 *  Automaps all properties to itself */
class Model {
    constructor({ ...props }) {
        if (!!props)
            Object.assign(this, props);
        else
            throw new Error('A model cannot have null properties!');
    }
}

module.exports = Model;