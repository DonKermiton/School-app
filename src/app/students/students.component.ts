import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {studentsService} from "./students.service";
import {Params, Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../shared/user.model";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  users: any = [];
  groupList= [
    '401',
    '402',
    '410',
  ]
  selected = '401';


  constructor(private studentService: studentsService,
              private router: Router,
              private afs: AngularFirestore) {
  }



  ngOnInit(): void {

    console.log(this.users);
    this.studentService.selectedGroup.subscribe(e => {
      this.users.length =0;
      this.studentService.getStudents().subscribe(value => {
        value.map((doc: any) => {
          if (doc.marks.group === e) {
             this.afs.collection('users').doc(doc.id).valueChanges().subscribe(value => {
              this.studentService.userProfile.next(value);

            })
          }
        });
      })
    })
    this.studentService.selectedGroup.subscribe(value => {
      this.selected = value
    })

    this.studentService.userProfile.subscribe((value:User) => {
      if(value !== null) {
          this.users.push(value);
          console.log(this.users);

      }

    });
  }

  changeGroup(group: Event) {

    const id = (<HTMLInputElement>group.target).value;
    this.studentService.selectedGroup.next(id);


  }


}
