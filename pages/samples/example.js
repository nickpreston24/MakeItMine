class Example extends React.Component {

    static async getInitialProps() {
        return {
            test: 'test'
        }
    }

    render() {
        return (
            <h1>Hi there {this.props.test}</h1>
        )
    }

}

export default Example;