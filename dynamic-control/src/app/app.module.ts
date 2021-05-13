import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFormComponent } from './add-form/add-form.component';
import { ViewFormComponent } from './view-form/view-form.component';
import { ListDataComponent } from './list-data/list-data.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddFormComponent,
    ViewFormComponent,
    ListDataComponent,
    UpdateDataComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule,
    AppRoutingModule, HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
