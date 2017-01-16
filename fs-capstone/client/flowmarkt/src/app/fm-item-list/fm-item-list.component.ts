import { Component, OnInit } from '@angular/core';

import {Observable} from "rxjs"; // import observable
 
import {FmItemService} from '../fm-item.service'; // import item service
import {FmItem} from "../fm-item"; // import item definitions

@Component({
  selector: 'app-fm-item-list',
  templateUrl: './fm-item-list.component.html',
  styleUrls: ['./fm-item-list.component.css']
})
export class FmItemListComponent implements OnInit {

  private items: Observable<FmItem[]>; // define result

  // inject service
  constructor(private itemService: FmItemService) {}

  ngOnInit() {
    this.items = this.itemService.getAllItems(); // get all items
  }

}
