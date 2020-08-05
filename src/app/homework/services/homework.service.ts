import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";

import {map, take} from "rxjs/operators";
import {BehaviorSubject, Subject} from "rxjs";
import {homeworkModel} from "../models/homework.model";

@Injectable({
  providedIn: "root"
})

export class homeworkService {
  constructor(private afs: AngularFirestore) {
  }


  saveHomework(submitForm: homeworkModel){
    this.afs.collection('students').doc(submitForm.group).collection('homeworks').add(submitForm).catch(console.log);
  }

  editHomework(submitForm: object){
    // return this.afs.collection('students').doc()
  }


  getHomeworks(group){
    return this.afs.collection('students').doc(group).collection('homeworks').snapshotChanges().pipe(
      map(document => {
        return document.map(doc => {
          const docID = doc.payload.doc.id
          const data = doc.payload.doc.data();

          return {docID, data}
        })
      })
    )
  }

  getHomeworkByID(id: string, group: string){
   return this.afs.collection('students').doc(group).collection('homeworks').doc(id).get();
  }

  updateHomework(id: string, group: string, submitForm: homeworkModel){
    this.afs.collection('students').doc(group).collection('homeworks').doc(id).update(submitForm).catch(console.log);
  }

  saveStudentResponse(homework: string, group: string, homeworkID: string, studentsUID :string){
    const test = {
      [studentsUID]: {
        homework,
      }
    }
    this.afs.collection('students').doc(group).collection('homeworkAnswers').doc(homeworkID).set(test, {merge: true}).catch(console.log);
  }

  getStudentResponse(group: string, homeworkID: string, studentsUID :string){
    return this.afs.collection('students').doc(group).collection('homeworkAnswers').doc(homeworkID).get();

  }

}
