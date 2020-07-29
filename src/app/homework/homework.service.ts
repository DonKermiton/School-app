import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";

import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class homeworkService {
  constructor(private afs: AngularFirestore,
             ) {
  }

  saveHomework(file: object){
    const homework = {
      file
    }
    // @ts-ignore
    this.afs.collection('homework').doc(file.group).collection('homeworks').doc(file.title).set(homework)
  }

   getHomeworkForGroup(group: string){
   return this.afs.collection('homework').doc(group).collection('homeworks').snapshotChanges().pipe(
     map(document => {
       return document.map(e => {
         const id = e.payload.doc.id;
         const marks = e.payload.doc.data();

         return {id, marks};
       })
     }),take(1)
   )
  }




/*  getHomework(){
    this.afs.collection('homework').doc('401').collection('homeworks').doc('sdfasdf').valueChanges().subscribe(console.log);
  }*/

}
