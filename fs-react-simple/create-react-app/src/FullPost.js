import React, {Component} from "react";
import axios from "axios";

// Show single post when user has navigated to detail view

class FullPost extends Component {

    // When implementing the constructor for a React.Component subclass,
    // you should call super(props) before any other statement.
    // Otherwise, this.props will be undefined in the constructor, which can lead to bugs.
    // https://facebook.github.io/react/docs/react-component.html
    constructor(props) {
        super(props);

        // The constructor is the right place to initialize state.
        // If you don't initialize state and you don't bind methods, you don't need to implement a constructor for your React component.
        // https://facebook.github.io/react/docs/react-component.html

        this.state = {
            data: {}
        };
    }

    // componentDidMount() is invoked immediately after a component is mounted.
    // Initialization that requires DOM nodes should go here.
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    // Setting state in this method will trigger a re-rendering.


    componentDidMount() {

        // _this = this is needed as axios.get creates promise, which gets access to _this thru closure
        // as promise doesn't know this of object from which operation was started it needs to be explicitly captured
        var _this = this;

        // Parameters are taken from route:
        // The parts that start with : are URL parameters whose values will be parsed out and made available
        // to route components on this.props.params[name].
        // https://github.com/reactjs/react-router-tutorial/tree/master/lessons/06-params
        var url = "http://localhost:3100/posts/" + this.props.params.id;

        console.log("get post from " + url)
        axios.get(url)
            .then(function (response) {
                console.log(response.data);

                // Never mutate this.state directly, as calling setState() afterwards may replace the mutation you made.
                // Treat this.state as if it were immutable.
                // https://facebook.github.io/react/docs/react-component.html
                _this.setState({data: response.data});

                // force update not needed when setState is used instead of mutating directly
                // force update after state has changed
                // _this.forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h2>{this.state.data.title}</h2>
                <small>{this.state.data.author} {this.state.data.time}</small>
                <p>{this.state.data.content}</p>
                <br/>
            </div>
        );
    }
}

export default FullPost;