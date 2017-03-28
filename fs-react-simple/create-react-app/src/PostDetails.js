import React, {Component} from "react";
import TextTruncate from "react-text-truncate";
import {Link} from "react-router";

// Show single item embedded to list of posts - this is not own view or part of navigation
// properties are used to pass values to here as parameters 
// https://facebook.github.io/react/docs/components-and-props.html

class PostDetails extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <div>
                    <TextTruncate line={2} text={this.props.content}/>
                		<Link to={`/posts/${this.props.id}`}>mehr...</Link>
                </div>
                <br/>
            </div>
        );
    }
}

// define metadata for props to enable type checking
// https://facebook.github.io/react/docs/typechecking-with-proptypes.html

PostDetails.propTypes = {
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    time: React.PropTypes.string.isRequired
};

// export component with ES6 default export 

export default PostDetails;