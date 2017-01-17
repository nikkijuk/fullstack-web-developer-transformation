import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FmItemEditFormComponent } from './fm-item-edit-form/fm-item-edit-form.component';
import { FmItemDetailsComponent } from './fm-item-details/fm-item-details.component';
import { FmItemListComponent } from './fm-item-list/fm-item-list.component';

import { FmItemService } from './fm-item.service'; // import item service

import {RouterModule}   from '@angular/router';
import { TruncatePipe } from './truncate.pipe'; // import router

@NgModule({
  declarations: [
    AppComponent,
    FmItemEditFormComponent,
    FmItemDetailsComponent,
    FmItemListComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    // add routes
    RouterModule.forRoot([
      {
        path: '',
        component: FmItemListComponent
      },
      {
        path: 'items/:id',
        component: FmItemDetailsComponent
      },
      {
        path: 'new',
        component: FmItemEditFormComponent
      }
    ])
  ],
  providers: [FmItemService], // provide service
  bootstrap: [AppComponent]
})

export class AppModule { }
