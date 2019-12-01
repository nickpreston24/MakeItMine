const Model = require('./Model');

module.exports = class Recipe extends Model {
    constructor(id, title, ingredients = [], instructions = [], url = null, ...rest) {
        super(rest)
        Object.assign(this, { id, title, url, ingredients, instructions })
    }

    withAuthor(author) {
        if (typeof (author) === 'Author') {
            this.author = author;
            this.author.name = ((this.author.firstName || "") + " " + (this.author.lastName || "")).trim();
        }
    }

    /**
     * TODO: To an Edamame Recipe (typescriptify?)
     */
    // edamameToRecipes(recipe) {
    //     return {
    //         title: recipe.label,
    //         ingredients: recipe.ingredients.map(i => i.text),
    //         // instructions: recipe.instructions,
    //         image: recipe.image,
    //         url: recipe.url,
    //     }
    // }    
}
