import { Component } from '@angular/core';
import {AuthService} from "./auth/services/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "./auth/models/user.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Student-app';
  sideMenu = true;

  constructor(private auth: AuthService,
              private angularFireAuth: AngularFireAuth) {
    this.auth.AutoLogin();

  }

  changeStateMenu(){
    console.log('zmiana')
    this.sideMenu = !this.sideMenu;
  }


}
