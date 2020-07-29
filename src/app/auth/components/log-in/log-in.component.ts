import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  LoginForm: FormGroup;
  isLoading = false;

  constructor(public auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
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
}
