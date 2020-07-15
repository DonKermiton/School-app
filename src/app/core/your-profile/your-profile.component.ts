import {Component, OnInit} from '@angular/core';
import {AuthService, User} from "../../auth/auth.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.css']
})
export class YourProfileComponent implements OnInit {
  profile: User;
  isInEditMode= false;

  constructor(private auth: AuthService,
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



}
