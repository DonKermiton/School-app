import {Component, OnInit} from '@angular/core';

import {User} from "../../auth/models/user.model";
import {studentsService} from "../../students/services/students.service";
import {homeworkService} from "../../homework/services/homework.service";
import {AuthService} from "../../auth/services/auth.service";
import {MarksModel} from "../../students/models/marks.model";
import {homeworkModel} from "../../homework/models/homework.model";
import {Router} from "@angular/router";
import {pipe} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";
import {studentModel} from "../../shared/student.model";

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
              private router: Router) {
  }

  ngOnInit(): void {
    let uid, group;
    this.authService.user$.pipe(
      tap((User: User) => {
        uid = User.uid;
        group = User.group;
      }),
      mergeMap(() =>   this.studentService.getMarks(uid, group)),
      mergeMap((marks: any) => {
        console.log(marks)
        this.marks = marks.data();
        console.log(  this.marks)
        return this.homeworkService.getHomeworks(group)
      })

    ).subscribe((homework: any) => {
      this.homework = homework;
      this.isDownloaded = true;
    })
  }

  addResolveToHomework(e: any) {
    this.router.navigate(['studentPanel/submitHomework'], {queryParams: {id: e.docID, group: e.data.group}})
  }
}
