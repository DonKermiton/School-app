import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  LoginForm: FormGroup;
  isLoading = false;
  accounts: logInInterface[] = [
    {type: 'admin', email: 'pietrucha2112@interia.pl', password: 'Windows7'}
  ]
  email: string;
  password: string;

  constructor(public auth: AuthService,
              private router: Router) {
    this.auth.user$.subscribe((user: User) => {
      if (user) {
        this.router.navigate(['/core/profile']);
      }
    });
  }

  ngOnInit(): void {


    this.LoginForm = new FormGroup({
      'email': new FormControl(this.email, [Validators.required, Validators.email]),
      'password': new FormControl(this.password, [Validators.required])
    });

  }


  LoginUser() {
    this.isLoading = true;
    this.auth.logViaEmail(this.LoginForm.value.email, this.LoginForm.value.password)
    this.isLoading = false;
  }

  viaGoogle() {
    this.auth.googleSignin();
  }

  onHandleError() {
    this.auth.error = null;
  }

  forgotPassword() {
    this.router.navigate(['/recoverPassword'])
  }

  clickLogin(email: string, password: string) {
    this.auth.logViaEmail(email, password);
  }
}

export interface logInInterface {
  type: string;
  email: string;
  password: string;

}
