import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  LoginForm: FormGroup;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

    /*   this.afAuth.signInWithEmailAndPassword('pietrucha211212@gmail.com','Windows7').then(e => {
         console.log('success', e);
       })*/
  }


 /* LoginUser() {
    this.auth.googleLogin()


    this.afAuth.signInWithEmailAndPassword(this.LoginForm.value.email, this.LoginForm.value.password)
      .then(value => {
        console.log('works', value);
      })

  }*/
}

