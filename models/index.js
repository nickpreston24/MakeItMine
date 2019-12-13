const Recipe = require('./Recipe');
const User = require('./User');
const Author = require('./Author');
// const { BlogPost } = require('./BlogPost.ts');

// const author = new Author(2, 'Greg', 'Wachowski');
// console.log('Author: ', author)
// console.log('Blog Post: ', new BlogPost("I like puppies", author))

module.exports = {
    Author,
    User,
    Recipe,
    // BlogPost
}