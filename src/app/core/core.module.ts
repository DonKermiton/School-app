import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CoreComponent} from './core.component';
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {AdminGuard} from "../shared/guards/admin.guard";
import {StudentPanelComponent} from "./components/student-panel/student-panel.component";
import {CanReadGuard} from "../shared/guards/can-read.guard";
import {SubmitHomeworkComponent} from "./components/student-panel/submit-homework/submit-homework.component";
import {YourProfileComponent} from "./components/your-profile/your-profile.component";
import {EditProfileComponent} from "./components/your-profile/edit-profile/edit-profile.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


const routes: Routes = [
  {path: '', component: CoreComponent},
  {path: 'adminPanel', component: AdminPanelComponent, canActivate: [AdminGuard]},
  {path: 'studentPanel', component: StudentPanelComponent, canActivate: [CanReadGuard]},
  {path: 'studentPanel/submitHomework', component: SubmitHomeworkComponent, canActivate: [CanReadGuard]},
  {path: 'profile', component: YourProfileComponent, children: [
    {path: 'edit', component: EditProfileComponent},]},



];

@NgModule({
  declarations: [
    CoreComponent,
    EditProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

  ],
})
export class CoreModule {
}
