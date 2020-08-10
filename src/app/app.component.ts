import { Component } from '@angular/core';
import {AuthService} from "./auth/services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Student-app';
  sideMenu = true;

  constructor(private auth: AuthService) {
    this.auth.AutoLogin();
  }

  changeStateMenu(){
    console.log('zmiana')
    this.sideMenu = !this.sideMenu;
  }


}
