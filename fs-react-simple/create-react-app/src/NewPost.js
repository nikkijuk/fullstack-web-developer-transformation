import React, {Component} from "react";
import {browserHistory} from "react-router";
import axios from "axios";

// Allows posting new blog entries

// This component could be further divided to container component and representation component 
// idea: "A container does data fetching and then renders its corresponding sub-component."
// container: fetch data, bind logic to sub components
// representation component: render, delegate event handling to container

// https://medium.com/@learnreact/container-components-c0e67432e005#.5beq4mnm6
// http://redux.js.org/docs/basics/UsageWithReact.html

class NewPost extends Component {


    // When implementing the constructor for a React.Component subclass,
    // you should call super(props) before any other statement.
    // Otherwise, this.props will be undefined in the constructor, which can lead to bugs.
    // https://facebook.github.io/react/docs/react-component.html
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            author: '',
            time: new Date().toLocaleString()
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handles submit of state changed using form
    handleSubmit(event) {
        event.preventDefault();
        console.log('Handling submission! :' + this.state.title + ", " + this.state.content + ", " + this.state.author);

        axios.post("http://localhost:3100/posts", {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        })
            .then(function (response) {
                console.log(response);
                browserHistory.push("/");
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    // handles change of fields value
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        var padding = {
            padding: '20px'
        }

        // JSX is not HTML
        // https://facebook.github.io/react/docs/jsx-in-depth.html#html-tags-vs.-react-components
        // use: className instead of class
        // use: htmlFor instead of for
        // use: style with variables, not with inline values
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="title" className="col-sm-2 control-label">Titel</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name="title" value={this.state.title}
                                   onChange={this.handleInputChange}></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content" className="col-sm-2 control-label">Text</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" id="content" name="content"
                                      value={this.state.content} onChange={this.handleInputChange}></textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title" className="col-sm-2 control-label">Autor</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="author" name="author"
                                   value={this.state.author} onChange={this.handleInputChange}></input>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="form-group">
                        <div className="col-sm-2">
                            <p style={padding}></p>
                        </div>
                        <div className="col-sm-2">
                            <div className="btn-group" role="group">
                                <button type="submit" className="btn button--save btn-success" placeholder="Post">
                                    Hinzufügen
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn button--cancel">Abbrechen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default NewPost;