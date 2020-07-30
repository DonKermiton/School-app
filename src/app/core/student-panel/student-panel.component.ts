import {Component, OnInit} from '@angular/core';

import {User} from "../../auth/models/user.model";
import {studentsService} from "../../students/services/students.service";
import {homeworkService} from "../../homework/services/homework.service";
import {AuthService} from "../../auth/services/auth.service";
import {MarksModel} from "../../students/models/marks.model";

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentPanelComponent implements OnInit {
  student: User;
  marks: MarksModel;
  uid: string
  homework;

  constructor(private authService: AuthService,
              private studentService: studentsService,
              private homeworkService: homeworkService) {
  }

  ngOnInit(): void {
    this.getPersonalData().catch(console.log);


  }

  async getPersonalData() {
    await this.authService.user$.subscribe((user: User) => {
      this.getMarks(user.uid, user.group);
    })
  }

  getMarks(uid: string, group: string) {
    this.studentService.getMarks(uid, group).subscribe(mark => {
      console.log(mark.data());
      this.marks = mark.data()
      // this.marks = mark;
      // this.getHomework();
    })
  }

  getHomework() {
   /* this.homeworkService.getHomeworkForGroup(this.marks.group).subscribe(value => {
      this.homework = value;
      console.log(value);
    })*/

  }


}
