import {Component, Input, OnInit} from '@angular/core';
import {homeworkService} from "../../services/homework.service";

@Component({
  selector: 'app-homework-list',
  templateUrl: './homework-list.component.html',
  styleUrls: ['./homework-list.component.css']
})
export class HomeworkListComponent implements OnInit {
  @Input() homework;
  @Input() group;

  constructor(private homeworkService: homeworkService) {
  }

  ngOnInit(): void {

  }

}
