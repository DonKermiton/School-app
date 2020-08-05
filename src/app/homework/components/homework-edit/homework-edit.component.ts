import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params} from "@angular/router";
import {homeworkService} from "../../services/homework.service";
import {homeworkModel} from "../../models/homework.model";
import {async} from "rxjs/internal/scheduler/async";
import {mergeMap} from "rxjs/operators";


@Component({
  selector: 'app-homework-edit',
  templateUrl: './homework-edit.component.html',
  styleUrls: ['./homework-edit.component.css']
})
export class HomeworkEditComponent implements OnInit {
  HomeworkEdit: FormGroup;
  inEdit = false;
  id: string;
  group: string;
  groupList = [
    '401',
    '402',
    '410',
  ];
  homeworkDetails: homeworkModel;

  constructor(private route: ActivatedRoute,
              private homeworkService: homeworkService) {

  }

  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap((params: Params) => {
        this.inEdit = params['detail'] != null;
        if(this.inEdit) {
          this.id = params['detail'];
          this.group = params['group'];
          return this.homeworkService.getHomeworkByID(this.id, this.group)
        }})
    ).subscribe((value:any) => {
      this.homeworkDetails = value.data();

      this.HomeworkEdit.controls['title'].patchValue(this.homeworkDetails.title)
      this.HomeworkEdit.controls['group'].patchValue(this.homeworkDetails.group)
      this.HomeworkEdit.controls['date'].patchValue(this.homeworkDetails.date)
      this.HomeworkEdit.controls['desc'].patchValue(this.homeworkDetails.desc)
    })

    this.initForm();

  }

   private initForm(){
      this.HomeworkEdit = new FormGroup({
        title: new FormControl(null, Validators.required),
        group: new FormControl(null, Validators.required),
        date: new FormControl(null, Validators.required),
        desc: new FormControl(null),
      })


  }


  onSubmit() {
    if(!this.inEdit) {
      this.homeworkService.saveHomework(this.HomeworkEdit.value)
    }else{
      this.homeworkService.updateHomework(this.id, this.group, this.HomeworkEdit.value);
    }
  }
}
