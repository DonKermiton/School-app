import {Component, OnInit} from '@angular/core';

import {User} from "../../../auth/models/user.model";
import {studentsService} from "../../../students/services/students.service";
import {homeworkService} from "../../../homework/services/homework.service";
import {AuthService} from "../../../auth/services/auth.service";
import {MarksModel} from "../../../students/models/marks.model";
import {homeworkModel} from "../../../homework/models/homework.model";
import {Router} from "@angular/router";
import {mergeMap, tap} from "rxjs/operators";
import {TimeService} from "../../../shared/service/time.service";

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})


export class StudentPanelComponent implements OnInit {
  student: User;
  marks: MarksModel;
  uid: string
  homework: homeworkModel[];
  isDownloaded: boolean;

  constructor(private authService: AuthService,
              private studentService: studentsService,
              private homeworkService: homeworkService,
              private router: Router,
              private timeService: TimeService) {
  }

  ngOnInit(): void {
    let uid, group;
    this.authService.user$.pipe(
      tap((User: User) => {
        uid = User.uid;
        group = User.group;
      }),
      mergeMap(() => this.studentService.getMarks(uid, group)),
      mergeMap((marks: any) => {
        this.marks = marks.data();
        return this.homeworkService.getHomeworks(group)
      })
    ).subscribe((homework: any) => {
      this.homework = homework;
      this.isDownloaded = true;
      console.log(this.timeService.isInPast(new Date()))
    })
  }


  addResolveToHomework(e: any) {
    this.router.navigate(['core/studentPanel/submitHomework'], {queryParams: {id: e.docID, group: e.data.group}})
  }


}


