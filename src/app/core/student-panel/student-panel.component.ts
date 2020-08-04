import {Component, OnInit} from '@angular/core';

import {User} from "../../auth/models/user.model";
import {studentsService} from "../../students/services/students.service";
import {homeworkService} from "../../homework/services/homework.service";
import {AuthService} from "../../auth/services/auth.service";
import {MarksModel} from "../../students/models/marks.model";
import {homeworkModel} from "../../homework/models/homework.model";
import {Router} from "@angular/router";

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

  constructor(private authService: AuthService,
              private studentService: studentsService,
              private homeworkService: homeworkService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPersonalData().catch(console.log);
  }

  async getPersonalData() {
    await this.authService.user$.subscribe((user: User) => {
      this.getMarks(user.uid, user.group);
      this.getHomework(user.group)
    })
  }

  getMarks(uid: string, group: string) {
    this.studentService.getMarks(uid, group).subscribe(mark => {
      this.marks = mark.data()
    })
  }

  getHomework(group: string){
    this.homeworkService.getHomeworks(group).subscribe((homework:any) => {
      this.homework = homework;
    })
  }


  addResolveToHomework(e: any) {
    this.router.navigate(['/submitHomework'], {queryParams: {id: e.docID, group: e.data.group}})
  }
}
