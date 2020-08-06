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

import {CanEditGuard} from "./shared/guards/can-edit.guard";
import {AdminPanelComponent} from './core/admin-panel/admin-panel.component';

import {StudentPanelComponent} from './core/student-panel/student-panel.component';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {ConfirmAlertComponent} from './shared/components/confirm-alert/confirm-alert.component';
import {SubmitHomeworkComponent} from "./core/student-panel/submit-homework/submit-homework.component";
import { SubmitHomeworkEditComponent } from './core/student-panel/submit-homework/submit-homework-edit/submit-homework-edit.component';
import {OverlayModule} from "@angular/cdk/overlay";
import { TooltipDirective } from './shared/directives/tooltip.directive';
import {tooltipComponent} from "./shared/components/tooltip/tooltip.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



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
  {path: 'studentPanel/submitHomework', component: SubmitHomeworkComponent, canActivate: [CanReadGuard]},
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
    SubmitHomeworkComponent,
    SubmitHomeworkEditComponent,
    TooltipDirective,
    tooltipComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    RouterModule.forRoot(appRoute, {useHash: true}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    OverlayModule,
    BrowserAnimationsModule,
  ],

  exports: [
    LoadingSpinnerComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    tooltipComponent,
  ],

})
export class AppModule {
}
