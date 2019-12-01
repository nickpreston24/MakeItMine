/** Base domain User class
 *  Automaps specific constructor params to itself */
class User {
    constructor(id, firstName, lastName) {
        Object.assign(this, { id, firstName, lastName })
        // console.log('assigned:', this)
        this.name = (lastName && firstName) ? [lastName.trim(), firstName.trim(),].join(", ") : null
    }
}

module.exports = User;