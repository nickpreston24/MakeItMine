export default class Model {
    constructor(...props) {
        if (props && props.length > 0) {
            Object.assign(this, ...props)
        }
    }
}