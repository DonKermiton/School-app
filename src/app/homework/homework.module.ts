import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeworkComponent} from './homework.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeworkListComponent} from './components/homework-list/homework-list.component';
import {HomeworkDetailComponent} from './components/homework-detail/homework-detail.component';
import {CanEditGuard} from "../shared/guards/can-edit.guard";
import { HomeworkEditComponent } from './components/homework-edit/homework-edit.component';
import { HomeworkCheckComponent } from './components/homework-check/homework-check.component';
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";



const routes: Routes = [
  {path: 'list', component: HomeworkComponent, children: [
      {path: 'add', component: HomeworkEditComponent},
      {path: ':group/:detail', component: HomeworkDetailComponent},

      {path: ':group/:detail/edit', component: HomeworkEditComponent},
    ]},
  {path: 'list/:group/:detail/check', component: HomeworkCheckComponent},
  {path: 'list/:group/:detail/check/:page', component: HomeworkCheckComponent},

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
