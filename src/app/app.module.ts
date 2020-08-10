import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {HeaderComponent} from "./shared/components/header/header.component";

import {RouterModule, Routes} from "@angular/router";
import {WelcomePageComponent} from './core/components/welcome-page/welcome-page.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignInComponent} from './auth/components/sign-in/sign-in.component';
import {LogInComponent} from './auth/components/log-in/log-in.component';
import {YourProfileComponent} from './core/components/your-profile/your-profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AdminGuard} from "./shared/guards/admin.guard";
import {CanReadGuard} from "./shared/guards/can-read.guard";
import {EditProfileComponent} from './core/components/your-profile/edit-profile/edit-profile.component';
import {ForgotPasswordComponent} from './auth/components/log-in/forgot-password/forgot-password.component';
import {AlertComponent} from './shared/components/alert/alert.component';
import {ViewUsersComponent} from './core/components/your-profile/view-users/view-users.component';

import {CanEditGuard} from "./shared/guards/can-edit.guard";
import {AdminPanelComponent} from './core/components/admin-panel/admin-panel.component';

import {StudentPanelComponent} from './core/components/student-panel/student-panel.component';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {ConfirmAlertComponent} from './shared/components/confirm-alert/confirm-alert.component';
import {SubmitHomeworkComponent} from "./core/components/student-panel/submit-homework/submit-homework.component";
import { SubmitHomeworkEditComponent } from './core/components/student-panel/submit-homework/submit-homework-edit/submit-homework-edit.component';
import {OverlayModule} from "@angular/cdk/overlay";
import { TooltipDirective } from './shared/directives/tooltip.directive';
import {tooltipComponent} from "./shared/components/tooltip/tooltip.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { LayoutLoggedComponentComponent } from './shared/layout-logged-component/layout-logged-component.component';
import {LogInInterceptorInterceptor} from "./auth/interceptors/log-in-interceptor.interceptor";




const appRoute: Routes = [
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'recoverPassword', component: ForgotPasswordComponent},

  {
    path: 'profile', component: YourProfileComponent, canActivate: [CanReadGuard], children: [
      {path: 'edit', component: EditProfileComponent, canActivate: [CanReadGuard]},
    ]
  },



  {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule), canActivate: [CanEditGuard], component: LayoutLoggedComponentComponent},
  {path: 'homework', loadChildren: () => import('./homework/homework.module').then(m => m.HomeworkModule), canActivate: [CanEditGuard], component: LayoutLoggedComponentComponent},
  { path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule), canActivate: [CanEditGuard] ,component: LayoutLoggedComponentComponent },

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
    SideMenuComponent,
    LayoutLoggedComponentComponent,
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInInterceptorInterceptor,
      multi: true,
    }
  ]

})
export class AppModule {
}
