import {Component, OnInit} from '@angular/core';
import {AuthService, User} from "../../auth/auth.service";

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.css']
})
export class YourProfileComponent implements OnInit {
  profile: User;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.profileInfo.subscribe(value => {
      this.profile = value;
    })
  }


}
