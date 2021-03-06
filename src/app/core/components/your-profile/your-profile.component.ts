import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params} from "@angular/router";

import {User} from "../../../auth/models/user.model";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.css']
})
export class YourProfileComponent implements OnInit {
  profile: User;
  isInEditMode= false;
  deleteMode = false;


  constructor(public auth: AuthService,
              private actvRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.auth.profileInfo.subscribe(value => {
      this.profile = value;
    })
    this.actvRoute.params.subscribe((params: Params) => {
        this.isInEditMode = params['edit'] != null;

    })
  }


  deleteUser() {
    this.deleteMode = true;

    this.deleteMode = false;
    this.auth.deleteUser(this.profile.uid);
    console.log(event);
  }

}

