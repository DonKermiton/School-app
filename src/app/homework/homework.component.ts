import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {homeworkService} from "../homework/services/homework.service";
import {Observable, of, Subject} from "rxjs";
import {homeworkModel} from "./models/homework.model";
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  homeworkList: homeworkModel[];
  selectedGroup = new Subject();
  group: string;

  groupList = [
    '401',
    '402',
    '410',
  ];

  homeworkForm: FormGroup;

  constructor(private homeworkService: homeworkService) { }

  ngOnInit(): void {
   this.selectedGroup.pipe(
     mergeMap(((value: string) => {
       this.group = value;
       return this.homeworkService.getHomeworks(value);
     }))
   ).subscribe((doc: any) => {
     this.homeworkList = doc;
   })

    this.homeworkForm = new FormGroup({
      group: new FormControl(Validators.required)
    })
  }

  ChangeGroup(event: Event) {
    this.selectedGroup.next((<HTMLInputElement>event.target).value);
  }
}
