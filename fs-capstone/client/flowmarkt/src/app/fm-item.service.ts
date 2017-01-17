import { Injectable } from '@angular/core';

import {Http, Headers, Response} from "@angular/http"; // import http

import {Observable} from "rxjs"; // import rxjs observable interface
import "rxjs/add/operator/map"; // import only needed rxjs methods

import {environment} from "../environments/environment";

import {FmItem} from "./fm-item"; // import dto (plain old whatsoever object)

@Injectable()
export class FmItemService {

  private baseUrl: String = 'http://localhost:3000'; // Here just as example, value always overridden in constructor
  private baseTag: String = 'items'; // Here just as example, value always overridden in constructor
  private headers: Headers;

  // inject http
  constructor(public http: Http) { 
    this.baseUrl = environment.baseUrl;
    this.baseTag = environment.baseTag;

    this.headers = new Headers ();
    this.headers.append (environment.clientIdHeader, environment.clientIdDefault);
    this.headers.append (environment.clientSecretHeader, environment.clientSecretDefault);

    console.log (`url ${this.baseUrl}, tag ${this.baseTag}`);
  } 

  getAllItems() : Observable<FmItem[]>{
    return this.http
        .get(`${this.baseUrl}/${this.baseTag}`, {headers: this.headers})
        .map(response => response.json())
        .catch(this.handleError);
  }

  getItem(id: string) : Observable<FmItem> {
    return this.http
        .get(`${this.baseUrl}/${this.baseTag}/${id}`, {headers: this.headers})
        .map(response => response.json())
        .catch(this.handleError);
  }

  addItem(title: string, content: string, author: string, time: string){
    this.http
        .post(`${this.baseUrl}/${this.baseTag}`, {"title": title, "content": content, "author": author, "time": time}, {headers: this.headers})
        .subscribe (json => console.log(json)); // write result (success or failure) to console log
  }

private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}

}
