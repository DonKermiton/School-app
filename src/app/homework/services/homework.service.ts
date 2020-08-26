import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";

import {map, mergeMap} from "rxjs/operators";
import {homeworkModel} from "../models/homework.model";
import {of} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class homeworkService {
  constructor(private afs: AngularFirestore) {
  }


  saveHomework(submitForm: homeworkModel) {
    this.afs.collection('homeworks').add(submitForm);
  }

  getHomeworks(group: string, title: string) {
    if (group && !title) {
      return this.afs.collection('homeworks', ref => ref.where('group', '==', group)).snapshotChanges().pipe(
        map(document => {
          return document.map(doc => {
            const docID = doc.payload.doc.id
            const data = doc.payload.doc.data();

            return {docID, data}
          })
        })
      )

    } else if (!group && title) {
      return this.afs.collection('homeworks', ref => ref.where('title', '==', title)).snapshotChanges().pipe(
        map(document => {
          return document.map(doc => {
            const docID = doc.payload.doc.id
            const data = doc.payload.doc.data();

            return {docID, data}
          })
        })
      )

    } else if (group && title) {
      return this.afs.collection('homeworks', ref => ref.where('title', '==', title).where('group', '==', group))
        .snapshotChanges().pipe(
        map(document => {
          return document.map(doc => {
            const docID = doc.payload.doc.id
            const data = doc.payload.doc.data();

            return {docID, data}
          })
        })
      )

    } else {
      return this.afs.collection('homeworks', ref => ref.orderBy('date', 'asc')).snapshotChanges().pipe(
        map(document => {
          return document.map(doc => {
            const docID = doc.payload.doc.id
            const data = doc.payload.doc.data();

            return {docID, data}
          })
        })
      )
    }
  }

  getHomeworkByID(id: string, group: string) {
    return this.afs.collection('homeworks').doc(id).get();
  }

  updateHomework(id: string, group: string, submitForm: homeworkModel) {
    this.afs.collection('homeworks').doc(id).update(submitForm);
  }

  saveStudentResponse(homework: string, group: string, homeworkID: string, studentsUID: string) {
    const field = {
      homework,
      date: new Date().toLocaleString(),
      rated: false,
    }

    // this.afs.collection('students').doc(group).collection('homeworkAnswers').doc(homeworkID).set(test, {merge: true}).catch(console.log);
    this.afs.collection('homeworks').doc(homeworkID).collection('homeworkAnswers').doc(studentsUID).set(field);
  }

  getStudentResponse(group: string, homeworkID: string, studentsUID: string) {
    return this.afs.collection('homeworks').doc(group).collection('homeworks').doc(homeworkID).collection('homeworkAnswers').doc(studentsUID).get()

  }

  checkHomeworkStatus(uid: string, group) {
    return this.afs.collection('students').doc(group).collection('homeworkAnswers').doc(uid).get();
  }

  deleteHomework(group: string, id: string) {
    this.afs.collection('homeworks').doc(id).delete();
  }


  getStudentsAnswersWithPagination(group: string, id: string, pageNumber: number) {
    let docLength;

    const docRef = this.afs.collection('homeworks').doc(id)
      .collection('homeworkAnswers').get();

    return docRef.pipe(
      map(value => {

        if (value.docs.length !== 0 && pageNumber <= value.docs.length) {
          docLength = (value.docs.length)
          return value.docs[value.docs.length - pageNumber];
        }
      }),
      mergeMap((value) => {
        if (docLength) {
          return this.afs.collection('homeworks').doc(id)
            .collection('homeworkAnswers', ref => ref.orderBy('date', 'desc').startAt(value).limit(1)
            )
            .snapshotChanges()
            .pipe(
              map(document => {
                console.log(document);
                return document.map(doc => {
                  const docID = doc.payload.doc.id
                  const data = doc.payload.doc.data();

                  return {docID, data, docLength}
                })
              }))
        } else {
          return of(null)
        }
      })
    );


  }

  getAllHomeworkAnswers(group: string, id: string) {
    return this.afs.collection('homeworks')
      .doc(id).collection('homeworkAnswers', ref => ref.where('rated', '==', false)).valueChanges();
  }
}
