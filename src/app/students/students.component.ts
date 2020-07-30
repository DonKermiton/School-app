import {Component, OnInit} from '@angular/core';
import {studentsService} from "./services/students.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {studentModel} from "../shared/student.model";
import {pipe} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../auth/models/user.model";

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
  isLoading = false;
  gate = false;

  users: User[];
  preUsers = [];

  selectedGroup: string;

  constructor(public studentService: studentsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((group:Params) => {
      console.log(group['group']);
      if(group['group']) {
        this.studentService.getStudentsByGroup(group['group']).subscribe()
      }else{
        this.studentService.value.length = 0;
      }
    } );
  }

  changeGroup(group: Event) {
    this.router.navigate([], {queryParams: {group: (<HTMLInputElement>group.target).value}})

  }

}
