import {Component, OnInit} from '@angular/core';
import {studentsService} from "./students.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {studentModel} from "../shared/student.model";
import {pipe} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  groupList = [
    '401',
    '402',
    '410',
  ];

  users = [];
  preUsers = [];

  selectedGroup: string;

  constructor(private studentService: studentsService,
              private router: Router,
              private actRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.studentService.getGroupIDS().subscribe(value => this.preUsers = value)

    this.actRoute.queryParams.subscribe((param: Params) => {
      this.users.length = 0;
      this.selectedGroup = param.group;
      this.getUserData().then(() => {
        this.users = this.studentService.value;
      } );

     /* this.preUsers.map(sort => {

         this.studentService.getStudentsData(sort.id);
         this.users = this.studentService.usersProfile;
         console.log(this.users);
       })

     this.studentService.getStudents(this.selectedGroup).subscribe(value => {this.preUsers= value
       this.preUsers.map(value => {
         this.studentService.sortUsers(value, this.selectedGroup);
       }
       )
       this.preUsers = this.studentService.value;
 */


    });


    /*this.studentService.getStudentByUID(this.selectedGroup)
    this.users = this.studentService.value*/

  };

  // this.studentService.getStudentByUID(this.selectedGroup).subscribe((value => {this.users.push(value)}));



  async getUserData(){
    return this.preUsers.map(value => {
      this.studentService.getUserData(value, this.selectedGroup);
    })

  }




  changeGroup(group: Event) {
    console.log(this.preUsers);
    this.router.navigate([], {queryParams: {group: (<HTMLInputElement>group.target).value}})

  }

}
