import { Component } from '@angular/core';
import {AuthService} from "./auth/services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student-app';

  //todo napisać od nowa
  constructor(private auth: AuthService) {
    this.auth.AutoLogin();
  }


}
