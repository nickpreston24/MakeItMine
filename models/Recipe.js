export default class Recipe {
    // constructor({ id, title, author }, ...props) {
    constructor(props) {
        // console.log('setting props up: ', props);

        const { id, title, author } = props;
        const { url, label, image, ingredients } = props;

        this.ingredients = ingredients || [];
        this.instructions = [];
        this.image = image || "";
        this.url = url || "";

        // console.log(this.url);

        this.id = id || null;
        this.title = title || label || "";
        this.author = author || {};
        this.author.name = ((this.author.firstName || "") + " " + (this.author.lastName || "")).trim();

        // Object.assign(this, props);
    }

    // edamameToRecipes(recipe) {
    //     return {
    //         title: recipe.label,
    //         ingredients: recipe.ingredients.map(i => i.text),
    //         // instructions: recipe.instructions,
    //         image: recipe.image,
    //         url: recipe.url,
    //     }
    // }

    // // const { id, title, author } = props;

    // this.id = id || null;
    // this.title = title || rest.keys('label') ? rest.label : null || null;
    // this.ingredients = rest.keys('ingredients') ? rest.ingredients : null;
    // this.author = author || {};
    // this.author.name = ((this.author.firstName || "") + " " + (this.author.lastName || "")).trim();
}