import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {map, mergeAll, take} from "rxjs/operators";
import {studentModel} from "../shared/student.model";
import {BehaviorSubject, pipe, Subject} from "rxjs";
import {User} from "../shared/user.model";



@Injectable({
  providedIn: "root",
})

export class studentsService {
  value = [];
  studentProfile = new BehaviorSubject(null)

  constructor(private afs: AngularFirestore) {

  }

  getGroupIDS() {
    return this.afs.collection('marks').snapshotChanges().pipe(
      map(document => {
        return document.map(e => {
          const id =  e.payload.doc.id;
          const marks = e.payload.doc.data();

          return {id, marks}
        })
      }),take(1)
    )
  }

  getStudents(group: string) {
    return this.afs.collection('marks').snapshotChanges().pipe(map(document => {
        return document.map((e: any) => {

          const id = e.payload.doc.id;
          const marks = e.payload.doc.data();

          return {id, marks}

        })
      }),
      take(1));
  }

  createStudentData(userUID) {
    const userRef: AngularFirestoreDocument<studentModel> = this.afs.collection('marks').doc(userUID);
    userUID = {
      group: '410',
      marks: [
        {value: 2, desc: 'dziala'},
        {value: 3, desc: 'test'},
      ],
    }

    return userRef.set(userUID, {merge: true});
  }

  getStudentByUID(group: string){
    let x = new Subject();

    this.getStudents(group).subscribe(value => {
      this.value.splice(0, this.value.length)

      value.map(document => {
        if(document !== undefined) {

          const e = this.afs.collection('users').doc(document.id).valueChanges();

          e.subscribe(value1 => {
            this.value.push(value1);
            x.next(value1)});
        }
      })
    });


    return x;

  }
  getUserData(user: object, group: string){
    // @ts-ignore
    if(user.marks.group === group) {
      // @ts-ignore
      this.afs.collection('users').doc(user.id).valueChanges().subscribe((user: User) => {
          if (user) {
            this.value.push(user);
          }
        }
      )
    }
    console.log(this.value);
  }

  getUsers(uid: string){
    return this.afs.collection('users').doc(uid).valueChanges();
  }

  getMarks(uid) {
    return this.afs.collection('marks').doc(uid).valueChanges();

  }

  saveMarksToDatabase(uid, marks){
    return this.afs.collection('marks').doc(uid).update(marks.value).catch(console.log);


  }






}
