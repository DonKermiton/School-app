import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {homeworkService} from "../../../../homework/services/homework.service";
import {homeworkModel} from "../../../../homework/models/homework.model";
import {AuthService} from "../../../../auth/services/auth.service";
import {intervalToDuration} from 'date-fns'
import {interval} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";
import {TimeService} from "../../../../shared/service/time.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-submit-homework',
  templateUrl: './submit-homework.component.html',
  styleUrls: ['./submit-homework.component.css']
})
export class SubmitHomeworkComponent implements OnInit {
  homeworkID: string;
  homeworkGroup: string;
  homeworkData: homeworkModel;
  homeworkAnswerForm: FormGroup;
  time: Duration;
  descriptionMenu = true;
  homeworkAnswer: homeworkAnswerModel;


  constructor(private activatedRoute: ActivatedRoute,
              private homeworkService: homeworkService,
              private authService: AuthService,
              private timeService: TimeService) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      tap((params: Params) => {
        this.homeworkID = params['id'];
        this.homeworkGroup = params['group']
      }),

      mergeMap(() => this.homeworkService.getHomeworkByID(this.homeworkID, this.homeworkGroup)),
      mergeMap((homework: any) => {
        this.homeworkData = homework.data();
        return this.homeworkService.getStudentResponse(this.homeworkGroup, this.homeworkID, this.authService.userUID)
      })
    ).subscribe((homeworkAnswer: any) => {
      if (homeworkAnswer.exists) {
        this.homeworkAnswer = homeworkAnswer.data();
        this.homeworkAnswerForm.controls[`text`].patchValue(this.homeworkAnswer.homework);
      }
    })
    this.remainingTime();

    this.initForm();
  }

  remainingTime() {

    const source = interval(1000);

    source.subscribe(val => {
      this.time = intervalToDuration({
        start: new Date(),
        end: new Date(this.homeworkData.date)
      })
    });
  }

  saveHomework() {
    this.homeworkService.saveStudentResponse(this.homeworkAnswerForm.value.text, this.homeworkGroup, this.homeworkID, this.authService.userUID);
  }

  private initForm() {
    this.homeworkAnswerForm = new FormGroup({
      text: new FormControl(null, [Validators.required, Validators.maxLength(2500)])
    })
  }

}

export interface homeworkAnswerModel {
  date: Date;
  homework: string;
  rated: boolean;
}
