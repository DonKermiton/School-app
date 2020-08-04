import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeworkComponent} from './homework.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeworkListComponent} from './components/homework-list/homework-list.component';
import {HomeworkDetailComponent} from './components/homework-detail/homework-detail.component';
import {CanEditGuard} from "../shared/guards/can-edit.guard";
import { HomeworkEditComponent } from './components/homework-edit/homework-edit.component';



const routes: Routes = [
  {path: '', component: HomeworkComponent, children: [
      {path: 'add', component: HomeworkEditComponent},
      {path: ':group/:detail', component: HomeworkDetailComponent},
      {path: ':group/:detail/edit', component: HomeworkEditComponent},


    ]},

];

@NgModule({
  declarations: [HomeworkComponent, HomeworkListComponent, HomeworkDetailComponent, HomeworkEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeworkModule {
}
