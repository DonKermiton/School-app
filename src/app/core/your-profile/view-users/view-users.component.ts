import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../../auth/models/user.model";



@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  uid: number;
  userProfile: User = {
    email: "",
    photoURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    uid: "",
    roles: {
      admin: false,
      editor: false,
      sub: false,
    },
    displayName:  ''

  }

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore) {

  }

  ngOnInit(): void {

    this.route.params.subscribe((param: Params) => {
      this.uid = param['uid'];
      this.getProfile(this.uid);
    })
  }

  getProfile(uid){
    const userRef = this.afs.collection('users')
      .doc(uid);
    userRef.get().subscribe(value => {
      if(value.exists){
        this.userProfile = <User>value.data();
        console.log(this.userProfile);
      }else{
        console.log('The following UID has not be found');
      }
    })
  }



}
