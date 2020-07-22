import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {studentsService} from "./students.service";
import {Params, Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../shared/user.model";
import {pipe} from "rxjs";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  users= [];
  groupList= [
    '401',
    '402',
    '410',
  ]
  selected = '410';


  constructor(private studentService: studentsService,
              private router: Router,
              private afs: AngularFirestore) {
  }



  ngOnInit(): void {
    this.studentService.selectedGroup.subscribe(e => {
      this.studentService.getStudents().subscribe(value => {
        console.log(value);
        value.map((doc: any) => {
          if (doc.marks.group === e) {
            console.log(doc)
             this.afs.collection('users').doc(doc.id).valueChanges().subscribe(value => {
              this.users.push(value);

            })
          }
        });
      })
    })
   /* this.studentService.selectedGroup.subscribe(value => {
      this.selected = value
    })*/

  }

  changeGroup(group: Event) {
    this.users.length =0;
    const id = (<HTMLInputElement>group.target).value;
    this.studentService.selectedGroup.next(id);


  }


}
