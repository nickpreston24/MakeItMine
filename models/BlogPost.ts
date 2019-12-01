import Author from './Author'
import Model from './Model'

export class BlogPost extends Model {
    // private author: Author;
    constructor(public subject: string, public author: Author) {
        super()
        Object.assign(this, { subject, author })        
    }
}
