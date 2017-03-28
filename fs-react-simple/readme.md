React app notes

# react overview

react is made for rendering of views - no fuss: it doesn't do too much.

https://facebook.github.io/react/

there's plenty of examples of using it with ES5 and ES6 syntax

# language choices

react works with ts

https://www.typescriptlang.org/docs/handbook/react-&-webpack.html

http://blog.tomduncalf.com/posts/setting-up-typescript-and-react/

but as react isn't targeted to ts, even less developed with ts, there isn't solid culture of using Typescript with React

# choice of seed project

react developers have developed cli to provide fast ramp up to react

question is: should one use create react app as cli?

ideally one would use packaged cli to create application skeleton and have enough choice for configuration

if there's idea of using ts then create react app is no go - ts doesn't come out of box, and neither comes sass

https://github.com/facebookincubator/create-react-app

https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md

one could use react-create-app as starting point, and after ejecting it one could configure ts, sass, and others.

This kind of approach needs at least some knowledge of webpack

# alternatives to create-react-app

create react app doesn't have right defauls -- I'd like at least scss & ts -- which aren't included in it

Fortunately there's actively supported alternative: 

insin/nwb 
- A toolkit for React, Preact & Inferno apps, React libraries and other npm modules for the web, with no configuration (until you need it) 
- https://github.com/insin/nwb

mozilla/neo 
- Create and build React web applications with zero initial configuration and minimal fuss.
- https://github.com/mozilla/neo
- https://blog.eliperelman.com/neo-8bf3d7325f7

NYTimes/kyt 
- A toolkit that encapsulates and manages the configuration for web apps.
- https://github.com/NYTimes/kyt
- https://github.com/NYTimes/kyt-starter-static
- https://open.blogs.nytimes.com/2016/09/13/introducing-kyt-our-web-app-configuration-toolkit

Notable alternatives also include:

sagui 
- https://github.com/saguijs/sagui

roc 
- https://github.com/rocjs/roc

react-app 
- https://github.com/kriasoft/react-app

dev-toolkit
- https://github.com/stoikerty/dev-toolkit

tarec
- https://github.com/geowarin/tarec

yeoman / fountain
- http://yeoman.io/
- http://yeoman.io/codelab/
- https://github.com/FountainJS/generator-fountain-react

since yeoman with fountain is only one of these that support ts I've left to wonder why.. 

my personal conclusion: react is meant to be used with ES6, not with ts -- accept it, or work against flow 
(flow is also libraty which tries to provide type safety to js, which is one of drivers of Typescript)

# there's also alternatives to react

Small, fast, optimized 

- https://preactjs.com/
- https://infernojs.org/

But currently I don't have any interest to try them.

# start with create react app

Create react app is global tool, so let's install it globally using -g flag

	npm install -g create-react-app

Create skeleton of app

	create-react-app create-react-app
	cd create-react-app

# add bootstrap

Look instructions from github 

- https://react-bootstrap.github.io/

install components and save them to package.json

	npm install react-bootstrap --save
	npm install bootstrap@3 --save

integrate to app

add to index.js

```
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import and use in app.js

import { Navbar, Jumbotron, Button } from 'react-bootstrap';
```

# forms

forms can be implemented using "controlled components" - i.e. each fields state changes needs to be stored exactly at the moment when value changes

https://facebook.github.io/react/docs/forms.html

##  initialize components state and bind event handlers in constructor

what one needs to take care is (1) each field is initialized (2) change of field content is propagated to state of component (3) component state can be persisted

- fill this.state with default values
- bind input change event handler
- bind submit event handler

```
	constructor(props) {
		super(props);
		
	    this.state = {
	        title: '',
	        content: '',
	        author:''
	      };
			
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
```	
		
## handle state changes

- each field need to render default value when rendered first time
- each field must be bound to input change event handler

event handler is updating components model (this.state)

event handler implementation

```
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
```

jsx renders component model (this.state) and binds event handler to field

binding to handler

```
    <input type="text" className="form-control" id="title" name="title" value={this.state.title} onChange={this.handleInputChange} ></input>
```

## handle submit

- form must be bound to submit event handler

here sending event is still substituted with console.log

event handler implementation
		
```
	handleSubmit(event) {
		event.preventDefault();
		console.log('Handling submission! :'+this.state.title+", "+this.state.content+", "+this.state.author);
	}
```

form needs still to be bound to submit handler

binding to handler

```
	render(){
		return(
			<form onSubmit={this.handleSubmit}>
```

# add routes

For routing one needs additional component

https://github.com/ReactTraining/react-router

Router should be saved to package.json

	npm install --save react-router

Router is not officially part of React, and you might not even want to use it

https://medium.freecodecamp.com/you-might-not-need-react-router-38673620f3d#.7gx77phhj

I have used router as I don't know my exact requirements, and want to be ready to adapt later.

# post values to json server

React needs additional libraries to use backend services

Axios is promise based library, which might just need your requirements.

https://github.com/mzabriskie/axios

remember to save it to package.json

	npm install --save axios

It would be nice to have result as reactive stream, but with Axios you need to create stream yourself.


--

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd create-react-blog
  npm start

