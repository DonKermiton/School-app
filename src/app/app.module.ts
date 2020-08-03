import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {HeaderComponent} from "./shared/components/header/header.component";

import {RouterModule, Routes} from "@angular/router";
import {WelcomePageComponent} from './core/welcome-page/welcome-page.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignInComponent} from './auth/components/sign-in/sign-in.component';
import {LogInComponent} from './auth/components/log-in/log-in.component';
import {YourProfileComponent} from './core/your-profile/your-profile.component';
import {HttpClientModule} from "@angular/common/http";
import {AdminGuard} from "./shared/guards/admin.guard";
import {CanReadGuard} from "./shared/guards/can-read.guard";
import {EditProfileComponent} from './core/your-profile/edit-profile/edit-profile.component';
import {ForgotPasswordComponent} from './auth/components/log-in/forgot-password/forgot-password.component';
import {AlertComponent} from './shared/components/alert/alert.component';
import {ViewUsersComponent} from './core/your-profile/view-users/view-users.component';
import {StudentsListComponent} from './students/components/students-list/students-list.component';
import {StudentViewComponent} from './students/components/student-view/student-view.component';
import {EditStudentMarksComponent} from './students/components/student-view/edit-student-marks/edit-student-marks.component';
import {CanEditGuard} from "./shared/guards/can-edit.guard";
import {AdminPanelComponent} from './core/admin-panel/admin-panel.component';

import {StudentPanelComponent} from './core/student-panel/student-panel.component';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {ConfirmAlertComponent} from './shared/components/confirm-alert/confirm-alert.component';



const appRoute: Routes = [
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'recoverPassword', component: ForgotPasswordComponent},

  {
    path: 'profile', component: YourProfileComponent, canActivate: [CanReadGuard], children: [
      {path: 'edit', component: EditProfileComponent, canActivate: [CanReadGuard]},
    ]
  },
  {path: 'adminPanel', component: AdminPanelComponent, canActivate: [AdminGuard]},
  {path: 'studentPanel', component: StudentPanelComponent, canActivate: [CanReadGuard]},
  {path: 'profile/:uid', component: ViewUsersComponent},

  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)},
  {path: 'homework', loadChildren: () => import('./homework/homework.module').then(m => m.HomeworkModule), canActivate: [CanEditGuard]}


]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomePageComponent,
    SignInComponent,
    LogInComponent,
    YourProfileComponent,
    EditProfileComponent,
    ForgotPasswordComponent,
    AlertComponent,
    ViewUsersComponent,
    AdminPanelComponent,
    StudentPanelComponent,
    LoadingSpinnerComponent,
    ConfirmAlertComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    RouterModule.forRoot(appRoute, {useHash: true}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    LoadingSpinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
