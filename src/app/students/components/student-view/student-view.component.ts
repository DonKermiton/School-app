import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../../auth/models/user.model";
import {studentsService} from "../../services/students.service";
import {mergeMap, switchMap} from "rxjs/operators";

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

  selectedGroup: string;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: studentsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      mergeMap((params: Params) => {
        this.uid = params['edit'];
        return this.studentService.getUsers(this.uid)
      }),
      mergeMap((value: User) => {
        this.student = value;
        return this.studentService.getMarks(this.student.uid, this.student.group)
      })
    ).subscribe((marks) => {
      this.marks = marks.data().marks
    } )

    this.activatedRoute.queryParams.subscribe((params: Params) => {
     this.selectedGroup = params['group'];
    })

  }

  async getStudent(uid: string){
    this.studentService.getUsers(uid).subscribe((value: User) => {
      this.student = value;
      this.studentService.getMarks(this.student.uid, this.student.group).subscribe((marks) => {

        this.marks = marks.data().marks;
      })
    })
  }


  editMarks()
  {
    this.router.navigate(['show'], {relativeTo: this.activatedRoute, queryParams: {group: this.selectedGroup}})
  }
}
