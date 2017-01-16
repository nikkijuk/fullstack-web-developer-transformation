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
