export default class Recipe {
    constructor({ id, title, author }) {
        this.id = id;
        this.title = title || "";
        this.author = author || {};
        this.author.name = ((this.author.firstName || "") + " " + (this.author.lastName || "")).trim();
    }
}