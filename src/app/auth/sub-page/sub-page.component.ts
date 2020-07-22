import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";
import {User} from "../../shared/user.model";
import {studentsService} from "../../students/students.service";



@Component({
  selector: 'app-sub-page',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.css']
})


export class SubPageComponent implements OnInit {

  postRef: AngularFirestoreDocument<any>;
  post$: Observable<any>;

  user: User;

  group: object = [];


  constructor(private afs: AngularFirestore,
              public auth: AuthService,
              private studentService: studentsService) {

  }

  ngOnInit(): void {
    /*const x  = this.afs.collection('students');
    const e = x.snapshotChanges().pipe(
      map(doc => {
        return doc.map( e => {
          const data = e.payload.doc.data() as studentModel;
          const id = e.payload.doc.id;

          return { id, ...data };
        })
      })
    )
    e.subscribe(
      console.log(this.group)
    })*/

    this.studentService.getGroupIDS().subscribe(value => {
      console.log(value);
      for (const e of value) {
        this.group = value;
      }
      console.log(this.group)
    });

    this.postRef = this.afs.doc('students/410');
    this.post$ = this.postRef.valueChanges();
    this.auth.user$.subscribe(user => {
      this.user = user;

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
      /*  this.typeInfo = profile;
        console.log(this.typeInfo);
        console.log(this.typeInfo.id.country);*/
      });


    }


  }


  deletePost() {
    this.afs.collection('students').doc('410').set({name: 'test'});
  }

  checkGroup(i: string) {
    console.log(i);
  }
}
