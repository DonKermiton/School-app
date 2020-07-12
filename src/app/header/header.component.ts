import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth = false;
  profilePhotoUrl: string;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.isAuth = !!user;

    });
    this.auth.user$.subscribe(e => {
      this.profilePhotoUrl = e.photoURL;
      console.log('zmiana zdjęcia');
    });


  }

}
