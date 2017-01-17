import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

import {FmItemService} from "../fm-item.service";

@Component({
  selector: 'app-fm-item-edit-form',
  templateUrl: './fm-item-edit-form.component.html',
  styleUrls: ['./fm-item-edit-form.component.css']
})
export class FmItemEditFormComponent implements OnInit {

  // inject item service and router
  constructor(private itemService: FmItemService, private router: Router) {}

  ngOnInit() {
  }

  addItem(data) {
    // save values using service
    // values are taken directly from passed object, name of form field used as key
    this.itemService.addItem(data['title'], data['content'], data['author'], new Date().toLocaleString());

    // navigate back to main page using router
    this.router.navigate(['/']);
  }


}
