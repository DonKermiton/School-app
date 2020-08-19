import {Component, OnInit} from '@angular/core';
import {homeworkService} from "../../services/homework.service";
import {mergeMap, tap} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {studentsService} from "../../../students/services/students.service";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-homework-check',
  templateUrl: './homework-check.component.html',
  styleUrls: ['./homework-check.component.css']
})

export class HomeworkCheckComponent implements OnInit {
  Answers: homeworkAnswerInterface[];
  gate = true;
  addMark: string;
  group: string;
  userDisplayName: string;
  pageNumber: number;
  pageNbr: number;
  hideMenu = true;
  detail: string;
  homeworkAnswers: homeworkAnswerInterface[];


  constructor(private homeworkService: homeworkService,
              private router: Router,
              private route: ActivatedRoute,
              private studentService: studentsService,
              private authService: AuthService) {
  }

  ngOnInit(): void {


    this.authService.user$.pipe(
      tap((user) => {
        this.userDisplayName = user.displayName;
      })
    ).subscribe()
    this.route.params.pipe(
      mergeMap((params: Params) => {
        this.gate = true;
        this.group = params['group'];
        this.pageNumber = params['page'];
        this.detail = params['detail'];

        return this.homeworkService.getStudentsAnswersWithPagination(params['group'], params['detail'], params['page']);
      }),
      mergeMap((data: any) => {
        if (data) {
          this.pageNbr = data[0].docLength;
        } else {
          this.gate = true
        }
        this.Answers = data;
        console.log(this.Answers)
        return this.homeworkService.getAllHomeworkAnswers(this.group, this.detail)
      })
    ).subscribe((data: homeworkAnswerInterface[]) => {

      this.gate = false;
        this.homeworkAnswers = data;
      }
    )
  }

  showPopUp(e: string) {
    this.addMark = e;
  }

  saveMark($event: any) {
    this.studentService.addMark(this.group, this.addMark, $event.value, this.userDisplayName);
    this.studentService.addHomeworkMark(this.group, this.detail, this.addMark);
    this.addMark = '';
  }

  closePopUp() {
    this.addMark = '';
  }

  changePage(nbr: number) {
    this.router.navigate([`/homework/list/410/X4V9QS1NGYS1JhILJDOu/check/${+this.pageNumber + nbr}`], {relativeTo: this.route});
  }
}


export interface homeworkAnswerInterface {
  docID: string;
  docLength?: number;
  data: {
    homework: string;
    rated: boolean;
  }
}



