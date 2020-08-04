import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {homeworkService} from "../../../homework/services/homework.service";
import {homeworkModel} from "../../../homework/models/homework.model";
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../auth/services/auth.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-submit-homework',
  templateUrl: './submit-homework.component.html',
  styleUrls: ['./submit-homework.component.css']
})
export class SubmitHomeworkComponent implements OnInit {
  homeworkID: string;
  homeworkGroup: string;
  homeworkData: homeworkModel;


  constructor(private activatedRoute: ActivatedRoute,
              private homeworkService: homeworkService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.homeworkID = params['id']
      this.homeworkGroup = params['group']
      this.getHomework().catch(console.log);

    })
  }



  async getHomework(){
      return this.homeworkService.getHomeworkByID(this.homeworkID, this.homeworkGroup).subscribe((homework:any) => {
        this.homeworkData = homework.data();
        console.log(this.homeworkData);
      });
  }


  saveHomework($event: string) {
    this.homeworkService.saveStudentResponse($event, this.homeworkGroup, this.homeworkID, this.authService.userUID);
  }
}
