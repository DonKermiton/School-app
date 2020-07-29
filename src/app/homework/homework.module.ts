import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeworkComponent } from './homework.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
  { path: '', component: HomeworkComponent }
];

@NgModule({
  declarations: [HomeworkComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeworkModule { }
