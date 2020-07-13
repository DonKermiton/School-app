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



const appRoute: Routes = [

  {path: 'welcome', component: WelcomePageComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'profile', component: YourProfileComponent, canActivate:[CanReadGuard]},
  {path: 'testpage', component: SubPageComponent, canActivate: [AdminGuard]}

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
