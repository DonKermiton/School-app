import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StudentsComponent} from './students.component';
import {StudentViewComponent} from "./components/student-view/student-view.component";
import {CanEditGuard} from "../shared/guards/can-edit.guard";
import {EditStudentMarksComponent} from "./components/student-view/edit-student-marks/edit-student-marks.component";


const routes: Routes = [
  {path: '', component: StudentsComponent},
  {path: ':edit', component: StudentViewComponent, canActivate: [CanEditGuard]},
  {path: ':edit/show', component: EditStudentMarksComponent, canActivate: [CanEditGuard]},
];

@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentsModule {
}
