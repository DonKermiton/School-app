import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../../auth/models/user.model";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideMenu = new EventEmitter<void>();
  isAuth = true;
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

  sideMenuAction(){
    console.log('dziala')
    this.sideMenu.emit();
  }


}
