import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  SignInForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.SignInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email] ),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  SignInUser() {

  }


  SignInViaEmail() {
    this.authService.createUserViaEmail(this.SignInForm.value.email, this.SignInForm.value.password);
  }





}
