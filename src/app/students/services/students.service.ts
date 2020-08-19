import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {studentModel} from "../../shared/student.model";
import {BehaviorSubject} from "rxjs";
import {stringify} from "querystring";
import * as firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";


@Injectable({
  providedIn: "root",
})

export class studentsService {
  value = [];
  constructor(private afs: AngularFirestore,
              private fireAuth: AngularFireAuth) {

  }

  getStudentsByGroup(group: string) {
    this.value.length = 0;
    return this.afs.collection('students').doc(group).collection('students').snapshotChanges().pipe(
      map(document => {
        return document.map(e => {
          return this.afs.collection('users').doc(e.payload.doc.id).get().subscribe(value => this.value.push(value.data()));
        })
      })
    )
  }

  createStudentData(userUID, group) {
    const userRef: AngularFirestoreDocument<studentModel> = this.afs.collection('students').doc(group).collection('students').doc(userUID);
    userUID = {
      userUID,
    }
    return userRef.set(userUID, {merge: true});
  }
  createStudentMarks(userUID, group){
    const userMarksRef: AngularFirestoreDocument =  this.afs.collection('students').doc(group).collection('marks').doc(userUID);
    userUID = {

    }
    return userMarksRef.set(userUID);
  }


  getUsers(uid: string) {
    return this.afs.collection('users').doc(uid).valueChanges();
  }

  getMarks(uid, group) {
    let x;
    this.afs.collection('users').doc(uid).get().subscribe(e => {
      x = e.data().group
    })
    return this.afs.collection('students').doc(group).collection('marks').doc(uid).get();
  }

  saveMarksToDatabase(uid, marks, group) {
    console.log(marks)
     this.afs.collection('students').doc(group).collection('marks').doc(uid).set(marks);
  }

  addMark(group: string, uid: string, marks: any, userName: string){
    marks = {
      desc: marks.desc,
      value: marks.value,
      date: new Date().toLocaleString(),
      add: userName,
    }

    this.afs.collection('students').doc(group).collection('marks').doc(uid).update({
      marks: firebase.firestore.FieldValue.arrayUnion(marks)
    })
  }

  addHomeworkMark(group: string, id: string, studentID: string){
    this.afs.collection('students').doc(group).collection('homeworks').doc(id).collection('homeworkAnswers').doc(studentID).set({rated: true}, {merge: true})
  }


}
