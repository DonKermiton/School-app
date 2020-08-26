import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {RouterModule, Routes} from "@angular/router";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {CanEditGuard} from "./shared/guards/can-edit.guard";
import {OverlayModule} from "@angular/cdk/overlay";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {LogInInterceptorInterceptor} from "./core/interceptors/log-in-interceptor.interceptor";
import {LayoutLoggedComponentComponent} from "./shared/layout-logged-component/layout-logged-component.component";
import {CoreModule} from "./core/core.module";
import {CanReadGuard} from "./shared/guards/can-read.guard";
import {TooltipModule} from "ng2-tooltip-directive";


const appRoute: Routes = [

  {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
    canActivate: [CanEditGuard],
    component: LayoutLoggedComponentComponent
  },
  {
    path: 'homework',
    loadChildren: () => import('./homework/homework.module').then(m => m.HomeworkModule),
    canActivate: [CanReadGuard],
    component: LayoutLoggedComponentComponent
  },
  {
    path: 'core',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
    canActivate: [CanReadGuard],
    component: LayoutLoggedComponentComponent
  },
  {path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},

]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoute, {useHash: true}),
    ReactiveFormsModule,
    FormsModule,
    OverlayModule,
    BrowserAnimationsModule,
    TooltipModule
  ],


  bootstrap: [AppComponent],

})
export class AppModule {
}
