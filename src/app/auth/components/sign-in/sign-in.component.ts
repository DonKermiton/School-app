import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  SignInForm: FormGroup;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.SignInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'group': new FormControl('410', [Validators.required]),
    });
  }

  SignInUser() {

  }

  onHandleError() {
    this.authService.error = null;
  }


  SignInViaEmail() {
    this.authService.createUserViaEmail(this.SignInForm.value.email, this.SignInForm.value.password, this.SignInForm.value.group);

  }
}
