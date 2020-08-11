import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {AdminGuard} from "../shared/guards/admin.guard";
import {StudentPanelComponent} from "./components/student-panel/student-panel.component";
import {CanReadGuard} from "../shared/guards/can-read.guard";
import {SubmitHomeworkComponent} from "./components/student-panel/submit-homework/submit-homework.component";
import {ViewUsersComponent} from "./components/your-profile/view-users/view-users.component";
import {YourProfileComponent} from "./components/your-profile/your-profile.component";


const routes: Routes = [
  { path: '', component: CoreComponent },
  {path: 'adminPanel', component: AdminPanelComponent, canActivate: [AdminGuard]},
  {path: 'studentPanel', component: StudentPanelComponent, canActivate: [CanReadGuard]},
  {path: 'studentPanel/submitHomework', component: SubmitHomeworkComponent, canActivate: [CanReadGuard]},
  {path: 'profile', component: YourProfileComponent},
  {path: 'profile/:uid', component: ViewUsersComponent},

];

@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CoreModule { }
