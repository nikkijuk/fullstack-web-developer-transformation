# FlowMarkt prototype

FlowMarkt client project was generated with [angular-cli](https://github.com/angular/angular-cli).

Later TypeScript development was done with Gedit and WebStorm IDE.

## Install ide

https://www.jetbrains.com/webstorm/

## Install cli

npm install -g angular-cli

ng –version

1.0.0-beta.25.5

CLI refence manual is at https://cli.angular.io/reference.pdf

Comprehensive howto is at https://www.sitepoint.com/ultimate-angular-cli-reference/

## Check versions of dependencies

http://getbootstrap.com/

use 3.3.7

https://jquery.com/

use 3.1.1

# install bootstrap and jquery

npm install --save bootstrap@3.3.7

npm install --save jquery@3.1.1

## Create angular constructs with cli 

app, modules, components, services, classes, ..

https://github.com/angular/angular-cli#generating-components-directives-pipes-and-services

## create app

ng new flowmarkt

cd flowmarkt

note: "-router" and other flags make life easier here (but I forgot to use them)

# integrate bootstrap and jquery to created app

modify angular-cli.json styles and scripts section

angular-cli.json

```
     "styles": [
       "styles.css",
	   "../node_modules/bootstrap/dist/css/bootstrap.css"
     ],
     "scripts": [
       "../node_modules/core-js/client/shim.js",
       "../node_modules/jquery/dist/jquery.js",
       "../node_modules/bootstrap/dist/js/bootstrap.js"
     ],
```

# test that bootstrap functions

modify layout src/app/app.component.html

```
   <div class="container">
       {{title}}
   </div>
```

start live server with http reloading

ng serve

open browser at http://localhost:4200

bootstrap container definition works if text is moved away from left border of page

## test that live reloading functions

change text at page to see that live reloading funtions 

app.components.ts

```
title = 'Flow Markt';
```

## create ui components

# create edit item component

ng generate component fm-item-edit-form

 create src/app/fm-item-edit-form/fm-item-edit-form.component.css
 create src/app/fm-item-edit-form/fm-item-edit-form.component.html
 create src/app/fm-item-edit-form/fm-item-edit-form.component.spec.ts
 create src/app/fm-item-edit-form/fm-item-edit-form.component.ts
 update src/app/app.module.ts

# create list of items component

ng generate component fm-item-details

 create src/app/fm-item-details/fm-item-details.component.css
 create src/app/fm-item-details/fm-item-details.component.html
 create src/app/fm-item-details/fm-item-details.component.spec.ts
 create src/app/fm-item-details/fm-item-details.component.ts
 update src/app/app.module.ts

# create item details component

ng generate component fm-item-list

 create src/app/fm-item-list/fm-item-list.component.css
 create src/app/fm-item-list/fm-item-list.component.html
 create src/app/fm-item-list/fm-item-list.component.spec.ts
 create src/app/fm-item-list/fm-item-list.component.ts
 update src/app/app.module.ts

# create model for item

ng generate class fm-item

 create src/app/fm-item.ts

 add constructor to define attributes

```
export class FmItem {

 // added constructor: no need to define members in any other method
 constructor (id: number, title: string, content: string, author: string, time: string) {}

}
```

## create services 

for reading and writing items over http we need to create simple service

ng generate service fm-item-service

 create src/app/fm-item-service.service.ts
 WARNING Service is generated but not provided, it must be provided to be used

# provide service to components within module

edit app.module.ts

```
import { FmItemService } from './fm-item.service'; // import service
 
 (...)
 
 providers: [FmItemService], // provide service
```

# add methods to service

create, get single, get all

```
import { Injectable } from '@angular/core';

import {Http} from "@angular/http"; // import http

import {Observable} from "rxjs"; // import rxjs observable interface
import "rxjs/add/operator/map"; // import only needed rxjs methods

import {FmItem} from "./fm-item"; // import dto (plain old whatsoever object)

@Injectable()
export class FmItemService {

 private baseUrl: String = 'http://localhost:3000'; // TODO: base url should be made configurable

 constructor(public http: Http) { } // inject http

 getAllItems() : Observable<FmItem[]>{
   return this.http
       .get(`${this.baseUrl}/items`)
       .map(response => response.json())
 }

 getItem(id: string) : Observable<FmItem> {
   return this.http
       .get(`${this.baseUrl}/items/${id}`)
       .map(response => response.json())
 }

 addItem(title: string, content: string, author: string, time: string){
   this.http
       .post(`${this.baseUrl}/items`, {"title": title, "content": content, "author": author, "time": time})
       .subscribe (json => console.log(json)); // write result (success or failure) to console log
 }

}
```

to 	understand how observables & subscribe work see https://github.com/ReactiveX/rxjs

## create routes

create routes for main page (containing list of items), single item (id) and creating new

```
	import {RouterModule}   from '@angular/router'; // import router

	(...)

   // add routes
   RouterModule.forRoot([
     {
       path: '',
       component: FmItemListComponent
     },
     {
       path: 'item/:id',
       component: FmItemDetailsComponent
     },
     {
       path: 'new',
       component: FmItemEditFormComponent
     }
   ])
```



## add placeholder for routing to app.component.html page

```
<div class="container">
 <router-outlet></router-outlet>
</div>
```

after this result of routing should be seen inside main page

## add menu to app.component.html page

```
<header class="navbar navbar-light navbar-static-top">
 <div class="container">
   <nav>
       <ul class="nav navbar-nav">
         <li class="nav-item active">
           <a class="nav-item nav-link active" routerLink="/">Flow</a>
         </li>
         <li class="nav-item">
           <a class="nav-item nav-link " routerLink="/new">New</a>
         </li>
       </ul>
   </nav>
 </div>
</header>

<div class="container">
 <h1> {{title}} </h1>
 <p class="lead">FlowMarkt makes recycling fun: time spent presenting and finding items, negotiating conditions as well as delivering goods is made easy for you.</p>
</div>
```

menu is impelemented using bootstraps navigation components https://v4-alpha.getbootstrap.com/components/navbar/

## add details service

fm-item.details.component.ts

```
import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from "@angular/router"; // import router and selected route
import {FmItemService} from "../fm-item.service"; // import service to get items
import {FmItem} from "../fm-item"; // import item

@Component({
 selector: 'app-fm-item-details',
 templateUrl: './fm-item-details.component.html',
 styleUrls: ['./fm-item-details.component.css']
})
export class FmItemDetailsComponent implements OnInit {

 private selectedItem : FmItem = null; // define selected item

 // inject service, router and active route
 constructor(private itemService: FmItemService, private router: Router, private route: ActivatedRoute) { }

 ngOnInit() {
   this.route.params.subscribe(params => {
     let itemId = params["id"]; // get id
     this.itemService.getItem(itemId)
           .subscribe(item => this.selectedItem = item); // subscribe starts http request
   });
 }

}
```

## add details view

fm-item.details.component.html


```
<!-- information is only shown if selected item has value -->
<div *ngIf="selectedItem">
 <h2>{{ selectedItem.title }}</h2>
 <small>{{ selectedItem.author }} {{ selectedItem.time }}</small>
 <p>{{ selectedItem.content }}</p>
</div>
```

# add pipe to shorten long texts

ng generate pipe truncate

 create src/app/truncate.pipe.spec.ts
 create src/app/truncate.pipe.ts
 update src/app/app.module.ts

```
import {isUndefined} from "util";

 transform(value: string, maxLength?: number, appendix?: string) : string {

   let limit = (isUndefined(maxLength)) ? 10 : maxLength;
   let trail =(isUndefined(appendix)) ? '...' : appendix;

   return value.length > limit ? value.substring(0, limit) + trail : value;
 }
```

# add create new item form

add reactive forms as dependency to app module

```
import { ReactiveFormsModule } from '@angular/forms';

(...)

  imports: [
	(...)
    ReactiveFormsModule,
```

# add html edit form

note: this is plain form, no binding to ng

```
<div class="container">
    <form>
        <div class="row">
          <div class="form-group">
            <label for="title" class="col-sm-2 control-label">Title</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="title" name="title" required>
            </div>
          </div>
          <div class="form-group">
            <label for="content" class="col-sm-2 control-label">Description</label>
            <div class="col-sm-10">
              <textarea type="text" class="form-control" id="content" name="content" required></textarea>
            </div>
          </div>
          <div class="form-group">
            <label for="author" class="col-sm-2 control-label">Author</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="author" name="author" required>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="form-group">
            <div class="col-sm-2">
              <p style="padding: 20px;"></p>
            </div>
            <div class="col-sm-2">
              <div class="btn-group" role="group">
                <button type="submit" class="btn button--save btn-success">Add</button>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="btn-group" role="group">
                <button type="button" class="btn button--cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
    </form>
</div>
```

# add html edit component

note: plain component, no forms yet

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fm-item-edit-form',
  templateUrl: './fm-item-edit-form.component.html',
  styleUrls: ['./fm-item-edit-form.component.css']
})
export class FmItemEditFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
```

# under is some cli commands

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Initial (only after checkout)

npm install

## JSON-Server

json-server db.json -p 9990

–

https://github.com/Farata/angular2typescript