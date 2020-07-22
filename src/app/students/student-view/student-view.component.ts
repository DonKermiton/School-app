import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../shared/user.model";
import {studentsService} from "../students.service";
import {studentModel} from "../../shared/student.model";
import {Observable, of, Subscription} from "rxjs";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  student: User;
  marks: studentModel;
  uid: string;


  @Output() user: User

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: studentsService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.studentService.studentProfile.subscribe((value: User) => {
        this.studentService.getMarks(param.edit).subscribe((marks: any)=> {
          this.marks = (marks.marks);
        })
        if(value === null){
          this.studentService.getStudentByUID(param.edit).subscribe((user: User)=> {
            this.student = user;
          })
        }else{
          this.student = value;
        }
      })
    })
  }


  showMarks() {


  }

  deleteMark(index: number) {

  }

  editMarks() {
    this.router.navigate(['show'], {relativeTo: this.activatedRoute})
  }
}
