import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {studentModel} from "../shared/student.model";
import {BehaviorSubject, Subject} from "rxjs";



@Injectable({
  providedIn: "root",
})

export class studentsService {
  selectedGroup = new BehaviorSubject<string>('401');
  userProfile = new BehaviorSubject(null)
  studentProfile = new BehaviorSubject(null)

  constructor(private afs: AngularFirestore) {

  }

  getGroupIDS() {
    return this.afs.collection('students').snapshotChanges().pipe(
      map(document => {
        return document.map(e => {
          return e.payload.doc.id;
        })
      })
    )
  }

  getStudents() {
    return this.afs.collection('marks').snapshotChanges().pipe(map(document => {
        return document.map((e: any) => {
          const id = e.payload.doc.id;
          const marks = e.payload.doc.data();

          return {id, marks}

        })
      })
    )
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
    console.log('dziala')
    return userRef.set(userUID, {merge: true});
  }

  getStudentByUID(uid){
    return this.afs.collection('users').doc(uid).valueChanges();

  }

  getMarks(uid) {
    return this.afs.collection('marks').doc(uid).valueChanges();

  }

  saveMarksToDatabase(uid, marks){
      return this.afs.collection('marks').doc(uid).update(marks.value).catch(console.log);


  }






}
