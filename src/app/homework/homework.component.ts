import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {homeworkService} from "../homework/services/homework.service";

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  groupList = [
    '401',
    '402',
    '410',
  ];

  selectedGroup: string;
  homeworkForm: FormGroup;

  constructor(private actRoute: ActivatedRoute,
              private router: Router,
              private homeworkService: homeworkService) { }

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe((params: Params) => {
      this.selectedGroup = params['group']
    });

    this.homeworkForm = new FormGroup({
      group: new FormControl(this.selectedGroup, Validators.required),
      title: new FormControl(null),
      date: new FormControl(null, Validators.required),
      desc: new FormControl(null, Validators.required),
    })

  }


  changeGroup($event: Event) {
    this.router.navigate([], {queryParams: {group: (<HTMLInputElement>$event.target).value}})
  }

  addHomework() {
    // this.homeworkService.getHomeworkForGroup('401');
    this.homeworkService.saveHomework(this.homeworkForm.value);
    console.log(this.homeworkForm.value);
  }
}
