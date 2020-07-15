import {Component, OnInit} from '@angular/core';
import {AuthService, User} from "../auth/auth.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth = false;
  profile: User;

  constructor(public auth: AuthService) {

  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.isAuth = !!user;

    });

    this.auth.profileInfo.subscribe(value => {
      this.profile = value;
    })



  }

}
