import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent} from "./header/header.component";

import {RouterModule, Routes} from "@angular/router";
import { WelcomePageComponent } from './core/welcome-page/welcome-page.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignInComponent } from './core/sign-in/sign-in.component';
import { LogInComponent } from './core/log-in/log-in.component';
import { YourProfileComponent } from './core/your-profile/your-profile.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { SubPageComponent } from './auth/sub-page/sub-page.component';
import {canActivate} from "@angular/fire/auth-guard";
import {AdminGuard} from "./core/admin.guard";
import {CanReadGuard} from "./core/can-read.guard";
import { EditProfileComponent } from './core/your-profile/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './core/log-in/forgot-password/forgot-password.component';
import { AlertComponent } from './shared/alert/alert.component';
import { ViewUsersComponent } from './core/your-profile/view-users/view-users.component';
import { StudentsComponent } from './students/students.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { StudentViewComponent } from './students/student-view/student-view.component';
import { EditStudentMarksComponent } from './students/student-view/edit-student-marks/edit-student-marks.component';



const appRoute: Routes = [
  {path: 'welcome', component: WelcomePageComponent},

  {path: 'testpage', component: SubPageComponent, canActivate: [CanReadGuard]},
  {path: 'recoverPassword', component: ForgotPasswordComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'profile', component: YourProfileComponent, canActivate: [CanReadGuard], children: [
      {path: 'edit', component: EditProfileComponent, canActivate: [CanReadGuard]},
    ]},
  {path: 'profile/:uid', component: ViewUsersComponent},
  {path: 'students', component: StudentsComponent, children: [
      {path: ':edit', component: StudentViewComponent, canActivate: [CanReadGuard]},
      {path: ':edit/show', component: EditStudentMarksComponent, canActivate: [AdminGuard]},
    ]},


]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    WelcomePageComponent,
    SignInComponent,
    LogInComponent,
    YourProfileComponent,
    SubPageComponent,
    EditProfileComponent,
    ForgotPasswordComponent,
    AlertComponent,
    ViewUsersComponent,
    StudentsComponent,
    StudentsListComponent,
    StudentViewComponent,
    EditStudentMarksComponent,


  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    RouterModule.forRoot(appRoute, {useHash : true}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
