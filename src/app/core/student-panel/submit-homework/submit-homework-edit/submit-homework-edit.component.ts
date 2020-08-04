import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-submit-homework-edit',
  templateUrl: './submit-homework-edit.component.html',
  styleUrls: ['./submit-homework-edit.component.css']
})
export class SubmitHomeworkEditComponent implements OnInit {
  @Output() homework = new EventEmitter<string>();

  @Input() homeworkText: string;
  @Input() group: string;
  homeworkAnswer: FormGroup
  constructor() { }

  ngOnInit(): void {
    this.homeworkAnswer = new FormGroup({
      text: new FormControl(this.homeworkText, [Validators.required, Validators.maxLength(2500)])
    })
  }



  saveHomework() {
    this.homework.emit(this.homeworkAnswer.value.text);
  }
}
