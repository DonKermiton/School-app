import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {map, take} from "rxjs/operators";
import {studentModel} from "../../shared/student.model";
import {BehaviorSubject} from "rxjs";
import {User} from "../../auth/models/user.model";


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
        console.log(document);
        return document.map(e => {
          const id = e.payload.doc.id;
          const marks = e.payload.doc.data();

          return {id, marks}
        })
      })
    )
  }

  createStudentData(userUID, group) {
    const userRef: AngularFirestoreDocument<studentModel> = this.afs.collection('marks').doc(userUID);
    userUID = {
      group,
      marks: [
        {value: 2, desc: 'dziala'},
        {value: 3, desc: 'test'},
      ],
    }
    return userRef.set(userUID, {merge: true});
  }

  getUserData(user: object, group: string) {
    // @ts-ignore
    if (user.marks.group === group) {
      // @ts-ignore
      this.afs.collection('users').doc(user.id).valueChanges().subscribe((user: User) => {
          if (user) {
            this.value.push(user);
          }
        }
      )
    }
  }

  getUsers(uid: string) {
    return this.afs.collection('users').doc(uid).valueChanges();
  }

  getMarks(uid) {
    return this.afs.collection('marks').doc(uid).valueChanges();
  }

  saveMarksToDatabase(uid, marks) {


    return this.afs.collection('marks').doc(uid).update(marks.value).catch(console.log);
  }
}
