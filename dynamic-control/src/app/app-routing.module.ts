import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { ListDataComponent } from './list-data/list-data.component';

const routes: Routes = [
  { path: '', component: ListDataComponent },
  { path: 'list', component: ListDataComponent },
  { path: 'add', component: AddFormComponent },
  { path: 'edit/:id', component: AddFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
