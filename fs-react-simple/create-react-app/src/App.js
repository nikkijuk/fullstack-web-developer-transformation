import React, {Component} from "react";
import "./App.css";
import AllPosts from "./AllPosts.js";
import NewPost from "./NewPost.js";
import FullPost from "./FullPost.js";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

class App extends Component {
    render() {
        return (
            <div>
                <header className="navbar navbar-light navbar-static-top">
                    <div className="container">
                        <nav>
                            <ul className="nav navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-item nav-link active" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-item nav-link " href="/new">New</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

                <div className="bd-pageheader">
                    <div className="container">
                        <h1> JBlog react </h1>
                        <p className="lead">
                            Dies ist einfach nur ein einfacher Blog.
                        </p>
                    </div>
                </div>

                <Router history={browserHistory}>
                    <Route path="/">
                        <IndexRoute component={AllPosts}/>
                        <Route path="new" component={NewPost}/>
                        <Route path="posts/:id" component={FullPost}/>
                    </Route>
                </Router>

            </div>
        );
    }
}

export default App;
