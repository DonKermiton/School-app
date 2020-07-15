import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthService, User} from "../auth.service";

export interface studentModel {
  id:  {
    country: string,
    name: string,
    secondName: string,
  }
}


@Component({
  selector: 'app-sub-page',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.css']
})



export class SubPageComponent implements OnInit {

  postRef: AngularFirestoreDocument<any>;
  post$: Observable<any>;
  typeInfo: studentModel;
  user: User;


  constructor(private afs: AngularFirestore,
              public auth: AuthService) {

  }

  ngOnInit(): void {
    this.postRef = this.afs.doc('students/410');

    this.post$ = this.postRef.valueChanges();
    this.auth.user$.subscribe(user => {
      this.user = user
    })
  }
  editPost() {
    if (this.auth.canEdit(this.user)) {
      this.postRef.set({
        1: {
          name: 'michal',
          secondName: 'Pietrucha',
          country: 'Poland'
        }

      })
      this.post$.subscribe(profile => {
          this.typeInfo = profile;
          console.log(this.typeInfo);
          console.log(this.typeInfo.id.country);
        });


    }


  }



  deletePost() {
      this.afs.collection('students').doc('410').set({name: 'test'});
  }
}
