import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {User} from "../../shared/user.model";
import {studentsService} from "../../students/students.service";
import {homeworkService} from "../../homework/homework.service";

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentPanelComponent implements OnInit {
  student: User;
  marks;
  uid: string
  homework;

  constructor(private authService: AuthService,
              private studentService: studentsService,
              private homeworkService: homeworkService) { }

  ngOnInit(): void {
    this.getPersonalData().catch(console.log);
    this.getHomework();



  }

  async getPersonalData(){
      await this.authService.user$.subscribe((user: User) => {
      this.getMarks(user.uid);
    })
  }

   getMarks(uid){
    this.studentService.getMarks(uid).subscribe(mark => {
      this.marks = mark;
      this.getHomework();
    })
  }

    getHomework(){
    this.homeworkService.getHomeworkForGroup(this.marks.group).subscribe(value => {
      this.homework = value;
      console.log(value);
    })

    }


  getMark(e: any) {
    console.log(e);
  }

  assignHomework(e: any) {
    
  }
}
