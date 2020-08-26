import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../../auth/models/user.model";
import {studentsService} from "../../services/students.service";
import {mergeMap, switchMap, tap} from "rxjs/operators";
import {AuthService} from "../../../auth/services/auth.service";
import {studentModel} from "../../../shared/student.model";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  student: User;
  //todo create marks model
  marks: object;
  uid: string;
  averageMark: number;
  userDisplayName: string;

  selectedGroup: string;
  addMark: string;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: studentsService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      tap((user) => {
        this.userDisplayName = user.displayName;
      })
    ).subscribe()

    this.activatedRoute.params.pipe(
      mergeMap((params: Params) => {
        this.uid = params['edit'];
        return this.studentService.getUsers(this.uid)
      }),
      mergeMap((value: User) => {
        this.student = value;
        return this.studentService.getMarks(this.student.uid, this.student.group)
      })
    ).subscribe((marks: studentModel) => {
      if(marks) {
        console.log(marks)
        this.marks = marks.marks
        this.averageMark = this.arithmeticAverage(this.marks);
      }
    } )

    this.activatedRoute.queryParams.subscribe((params: Params) => {
     this.selectedGroup = params['group'];
    })

  }

   arithmeticAverage(marks: object){
    let sum = 0;
    let i = 0;
    for(const e in marks){
      i++;
      sum  = sum + (+marks[e].value);

    }
    sum = sum / i;
    return +sum.toFixed(1);
  }


  editMarks()
  {
    this.router.navigate(['show'], {relativeTo: this.activatedRoute, queryParams: {group: this.selectedGroup}})
  }

  closePopUp() {
    this.addMark = '';
  }

  saveMark($event: any) {
    this.studentService.addMark('', this.addMark, $event.value, this.userDisplayName);
    this.addMark = '';
  }

  showPopUp() {
    this.addMark = this.student.uid;
  }
}
