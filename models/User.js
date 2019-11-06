export default class User {
    constructor({ id, title, author }) {
        this.id = id;
        this.title = title || "";
        this.author = author || {};
        this.author.name = ((this.author.firstName || "") + " " + (this.author.lastName || "")).trim();
    }
}

// class UserAccount {
//     constructor({ firebaseId, user }) {
//         this.firebaseId = firebaseId;
//         this.user = user;
//     }
// }