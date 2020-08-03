import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {homeworkService} from "../../services/homework.service";
import {ActivatedRoute, Params} from "@angular/router";
import {homeworkModel} from "../../models/homework.model";

@Component({
  selector: 'app-homework-detail',
  templateUrl: './homework-detail.component.html',
  styleUrls: ['./homework-detail.component.css']
})
export class HomeworkDetailComponent implements OnInit {
  id: string;
  group: string;
  homeworkData: homeworkModel;

  constructor(private homeworkService: homeworkService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['detail'];
      this.group = params['group'];
      this.homeworkService.getHomeworkByID(this.id, this.group).subscribe((value:any) => {
        this.homeworkData = value.data()
      })
    })


  }

}
