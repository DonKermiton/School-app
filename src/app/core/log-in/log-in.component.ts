import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {catchError, tap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });


  }


  LoginUser() {
    this.auth.logViaEmail(this.LoginForm.value.email, this.LoginForm.value.password)
    console.log(this.LoginForm.value.email, this.LoginForm.value.password);
  }

  viaGoogle() {
    this.auth.googleSignin();
  }



}
