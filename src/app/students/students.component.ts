import {Component, OnInit} from '@angular/core';
import {studentsService} from "./services/students.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../auth/models/user.model";
import {mergeMap, tap} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: User[];
  studentsSortForm: FormGroup;
  displayNameSearch: string;
  emailSearch: string;

  showFilters = false;

  groupList = [
    '401',
    '402',
    '410',
  ];


  users: User[];

  selectedGroup = ''


  constructor(public studentService: studentsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.pipe(
      tap((params: Params) => {
        this.selectedGroup = params['group'];;
        this.displayNameSearch = params['name'];
        this.emailSearch = params['email'];

        if( this.selectedGroup ||  this.displayNameSearch ||  this.emailSearch){
          this.showFilters = true;
        }
      }),

      mergeMap((params: Params) => {
        return this.studentService.getStudentsByGroup(params['group'], params['name'])
      })
    ).subscribe((users: User[]) => {
      this.students = users;

    })

    this.initForm();
  }

  filterStudents() {
    this.router.navigate([], {
      queryParams: {
        group: this.studentsSortForm.value.group,
        name: this.studentsSortForm.value.displayName,
      }
    })
  }

  private initForm() {
    this.studentsSortForm = new FormGroup({
      group: new FormControl(this.selectedGroup),
      displayName: new FormControl(this.displayNameSearch),
      email: new FormControl(this.emailSearch),
    })
  }
}
