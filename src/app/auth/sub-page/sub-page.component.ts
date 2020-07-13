import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthService, User} from "../auth.service";

@Component({
  selector: 'app-sub-page',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.css']
})
export class SubPageComponent implements OnInit {

  postRef: AngularFirestoreDocument<any>;
  post$: Observable<any>;

  user: User;

  constructor(private afs: AngularFirestore,
              public auth: AuthService) {

  }

  ngOnInit(): void {
    this.postRef = this.afs.doc('students/410');
    this.post$ = this.postRef.valueChanges();
    this.auth.user$.subscribe(user=> {
      this.user = user
    })

    }
  editPost(){
    if(this.auth.canEdit(this.user)){
      this.postRef.set({
        id: {
          name: 'michal',
          secondName: 'Pietrucha',
          country: 'Poland'
        }

      })
      const x =this.postRef.collection('410');
      console.log(x);
    }


  }

  deletePost() {

  }
}
