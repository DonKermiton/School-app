import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeworkComponent} from './homework.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeworkListComponent} from './components/homework-list/homework-list.component';
import {HomeworkDetailComponent} from './components/homework-detail/homework-detail.component';
import {HomeworkEditComponent} from './components/homework-edit/homework-edit.component';
import {HomeworkCheckComponent} from './components/homework-check/homework-check.component';
import {SharedModule} from "../shared/shared.module";


const routes: Routes = [
  {
    path: 'list', component: HomeworkComponent, children: [



    ]
  },
  {path: 'list/add', component: HomeworkEditComponent},
  {path: 'list/:detail/edit', component: HomeworkEditComponent},
  {path: 'list/:detail', component: HomeworkDetailComponent},
  {path: 'list/:detail/check', component: HomeworkCheckComponent},
  {path: 'list/:detail/check/:page', component: HomeworkCheckComponent},

];

@NgModule({
  declarations: [HomeworkComponent, HomeworkListComponent, HomeworkDetailComponent, HomeworkEditComponent, HomeworkCheckComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],


})
export class HomeworkModule {
}
