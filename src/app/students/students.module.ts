import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StudentsComponent} from './students.component';
import {StudentViewComponent} from "./components/student-view/student-view.component";
import {EditStudentMarksComponent} from "./components/student-view/edit-student-marks/edit-student-marks.component";
import {AdminGuard} from "../shared/guards/admin.guard";
import {StudentsListComponent} from "./components/students-list/students-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


const routes: Routes = [
  {
    path: '', component: StudentsComponent, children: [
      {path: ':edit', component: StudentViewComponent, canActivate: [AdminGuard]},
      {path: ':edit/show', component: EditStudentMarksComponent, canActivate: [AdminGuard]},]
  },

];

@NgModule({
  declarations: [StudentsComponent,
    StudentsListComponent,
    StudentViewComponent,
    EditStudentMarksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,

  ],

})
export class StudentsModule {
}
