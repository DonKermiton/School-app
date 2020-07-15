import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService, User} from "../../../auth/auth.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  EditProfileForm: FormGroup;
  userInfo: User;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.profileInfo.subscribe(user => {
      this.userInfo = user;
    });

    this.EditProfileForm = new FormGroup({
      'displayName': new FormControl(this.userInfo.displayName),
      'photoURL': new FormControl(this.userInfo.photoURL),
    })
  }


  EditProfile() {
    this.userInfo.displayName = this.EditProfileForm.value.displayName;
    this.userInfo.photoURL = this.EditProfileForm.value.photoURL;
    this.auth.profileInfo.next(this.userInfo);
    this.auth.updateUserData(this.userInfo);

  }
}
