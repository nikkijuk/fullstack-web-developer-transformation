import React, {Component} from "react";
import PostDetails from "./PostDetails";
import axios from "axios";

// Show all posts

class AllPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.getData = this.getData.bind(this);

        this.getData();

        console.log(this.state.data);

    }

    // well --> get data
    getData() {
        var _this = this; // you need to capture this to variable, since .then is executed async
        axios.get("http://localhost:3100/posts")
            .then(function (response) {
                // manipulate state directly - note: right way would be to use always setState -- see FullPost.js as example
                _this.state.data = response.data;
                console.log(response.data);
                // force update after state has changed, this would not be needed if you use setState
                _this.forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // first time rendered before data is received
    render() {
        return (
            <div>
                <div className="col-sm-9">
                    {
                        // iterate over list of posts and transform objects to ui objects (embedded in jsx)
                        this.state.data.map(p =>
                            <PostDetails id={p.id}
                                         title={p.title}
                                         content={p.content}
                                         author={p.author}
                                         time={p.time}
                            />)
                    }
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-block">
                            <h4 className="card-title">Nur irgend ein Titel</h4>
                            <p className="card-text">Hey, ich bin wirklich nicht wichtig</p>
                            <a href="#" className="btn btn-primary">Irgend etwas tun</a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-block">
                            <h4 className="card-title">Noch so ein Titel</h4>
                            <p className="card-text">Ich bin nur irgend ein Text, der das hier etwas wichtiger machen
                                soll.
                                Dennoch bin ich nicht wirklich wichtig...</p>
                            <a href="#" className="btn btn-primary">Mache Eier!</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllPosts;