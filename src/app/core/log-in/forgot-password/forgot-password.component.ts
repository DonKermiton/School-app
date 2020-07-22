import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  RecoverPasswordForm: FormGroup;


  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.RecoverPasswordForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });

  }

  recoverPassword() {
      this.auth.resetPassword(this.RecoverPasswordForm.value.email);
  }

  onErrorOccured(){
    this.auth.error = null;
  }
}
