import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../../auth/models/user.model";
import {studentsService} from "../../services/students.service";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  student: User;
  marks
  uid: string;

  selectedGroup: string;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: studentsService,
              private router: Router) {
  }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe((params: Params) => {
      this.uid = params['edit'];
    })

    this.activatedRoute.queryParams.subscribe((param: Params) => {
      this.selectedGroup = param.group;
    });

    const student = this.getStudent();

    student.then(() => {
      if (!this.student) {
        this.studentService.getUsers(this.uid).subscribe((user: User) => {
          this.student = user;
          this.getMarks()
        });
      } else {
        this.getMarks()
      }

      this.studentService.studentProfile.subscribe(() => this.getMarks().catch(() => {
        console.log('Choose User')
      }));


    })

  }

  async getStudent() {
    return this.studentService.studentProfile.subscribe((value: any) => {
      this.student = value;
    });
  }

  async getMarks() {
    if (this.student) {
      this.studentService.getMarks(this.student.uid).subscribe((value: any) => {
          this.marks = value.marks;
        })
    }
}


showMarks()
{


}

deleteMark(index
:
number
)
{

}

editMarks()
{
  this.router.navigate(['show'], {relativeTo: this.activatedRoute, queryParams: {group: this.selectedGroup}})
}

viewProfile()
{
  this.router.navigate([`/profile/${this.student.uid}`])
}
}