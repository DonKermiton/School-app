import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import * as firebase from "firebase";


@Injectable({
  providedIn: "root",
})

export class studentsService {
  value = [];

  constructor(private afs: AngularFirestore) {
  }

  getStudentsByGroup(group: string, displayName: string) {
    // const docRef = this.afs.collection('pupils', ref => ref.where('group', '==' , '401'));
    // const docRef = this.afs.collection('users', ref => ref.where('roles.sub', '==' , true));
    let docRef = this.afs.collection('users', ref => {
      return ref
        .where('roles.sub', '==', true)

    });

    if (group && !displayName) {
      docRef = this.afs.collection('users', ref => {
        return ref
          .where('roles.sub', '==', true)
          .where('group', '==', group)
      });
    } else if (displayName && !group) {
      docRef = this.afs.collection('users', ref => {
        return ref
          .where('roles.sub', '==', true)
          .where('displayName', '==', displayName)
      });
    } else if (displayName && group) {
      docRef = this.afs.collection('users', ref => {
        return ref
          .where('roles.sub', '==', true)
          .where('displayName', '==', displayName)
          .where('group', '==', group)
      });
    }


    return docRef.valueChanges();

  }

  createStudentData(userUID, group) {
    /*const userRef: AngularFirestoreDocument<studentModel> = this.afs.collection('pupils').doc(userUID);


   return userRef.set(data, {merge: true});*/
  }

  createStudentMarks(userUID, group) {
    const userMarksRef: AngularFirestoreDocument = this.afs.collection('students').doc(group).collection('marks').doc(userUID);
    userUID = {}
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
    // return this.afs.collection('students').doc('410').collection('marks').doc(uid).get();
    return this.afs.collection('pupils').doc(uid).collection('data').doc('marks').valueChanges();
  }

  saveMarksToDatabase(uid, marks, group) {
    this.afs.collection('pupils').doc(uid).collection('data').doc('marks').set(marks);
  }

  addMark(group: string, uid: string, marks: any, userName: string) {
    marks = {
      desc: marks.desc,
      value: marks.value,
      date: new Date().toLocaleString(),
      add: userName,
    }

    this.afs.collection('pupils').doc(uid).collection('data').doc('marks').update({
      marks: firebase.firestore.FieldValue.arrayUnion(marks)
    })
  }

  addHomeworkMark(group: string, id: string, studentID: string) {
    this.afs.collection('students').doc(group).collection('homeworks').doc(id).collection('homeworkAnswers').doc(studentID).set({rated: true}, {merge: true})
  }


}
