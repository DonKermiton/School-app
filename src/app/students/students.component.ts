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
  isLoading = false;
  gate = false;

  users = [];
  preUsers = [];

  selectedGroup: string;

  constructor(private studentService: studentsService,
              private router: Router,
              private actRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.studentService.getGroupIDS().subscribe(value => {
      this.preUsers = value
    });

    this.actRoute.queryParams.subscribe((param: Params) => {
      console.log(param);
      this.isLoading = true;
      this.users.length = 0;
      this.selectedGroup = param.group;
      this.getUserData().then(() => {
        this.users = this.studentService.value;
        this.gate = true;

        this.isLoading = false;
      });
    });
  };


  async getUserData() {
    return this.preUsers.map(value => {
      this.studentService.getUserData(value, this.selectedGroup);
    })

  }

  changeGroup(group: Event) {
    this.router.navigate([], {queryParams: {group: (<HTMLInputElement>group.target).value}})

  }

}
