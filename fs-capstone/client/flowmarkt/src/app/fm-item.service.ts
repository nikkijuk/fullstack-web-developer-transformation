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
