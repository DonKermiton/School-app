import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import {LogInComponent} from "./components/log-in/log-in.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



const routes: Routes = [
  { path: '', component: LogInComponent },
  {path: 'auth/logIn', component: LogInComponent},
  {path: 'auth/signIn', component: SignInComponent},
];

@NgModule({
  declarations: [AuthComponent,
  LogInComponent,
  SignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],

})
export class AuthModule { }
