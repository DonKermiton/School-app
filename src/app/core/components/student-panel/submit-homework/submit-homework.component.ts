import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {homeworkService} from "../../../../homework/services/homework.service";
import {homeworkModel} from "../../../../homework/models/homework.model";
import {AuthService} from "../../../../auth/services/auth.service";
import {intervalToDuration, isFuture} from 'date-fns'
import {interval} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";
import {TimeService} from "../../../../shared/service/time.service";

@Component({
  selector: 'app-submit-homework',
  templateUrl: './submit-homework.component.html',
  styleUrls: ['./submit-homework.component.css']
})
export class SubmitHomeworkComponent implements OnInit {
  homeworkID: string;
  homeworkGroup: string;
  homeworkData: homeworkModel;
  homeworkAnswer: any;
  time: Duration;

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

    ).subscribe(homeworkAnswer => {
      if(homeworkAnswer.get(this.authService.userUID)) {
        this.homeworkAnswer = homeworkAnswer.get(this.authService.userUID).homework;
      }
    })
      this.remainingTime()
    }


  checkIsPast(){
    return this.timeService.isInPast(new Date(this.homeworkData.date));
  }

  remainingTime() {
//emit value in sequence every 1 second
    const source = interval(1000);

     source.subscribe(val => {
      this.time = intervalToDuration({
        start: new Date(),
        end: new Date(this.homeworkData.date)
      })
    });
  }

  saveHomework($event: string) {
    this.homeworkService.saveStudentResponse($event, this.homeworkGroup, this.homeworkID, this.authService.userUID);
  }


}
