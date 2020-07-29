import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import {LogInComponent} from "./components/log-in/log-in.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";


const routes: Routes = [
  { path: '', component: AuthComponent },
  {path: 'logIn', component: LogInComponent},
  {path: 'signIn', component: SignInComponent},
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
