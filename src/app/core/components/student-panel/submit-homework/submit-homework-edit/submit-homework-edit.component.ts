import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-submit-homework-edit',
  templateUrl: './submit-homework-edit.component.html',
  styleUrls: ['./submit-homework-edit.component.css']
})
export class SubmitHomeworkEditComponent implements OnInit {
  @Output() homework = new EventEmitter<string>();

  @Input() homeworkText: string;
  @Input() group: string;
  homeworkAnswer: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.homeworkText);
    this.homeworkAnswer = new FormGroup({
      text: new FormControl(this.homeworkText, [Validators.required, Validators.maxLength(2500)])
    })
    setTimeout(() => {
      //TODO async task to change
      this.homeworkAnswer.controls[`text`].patchValue(this.homeworkText);
    },1000);

  }


  saveHomework() {
    // this.router.navigate(['/studentPanel'])
    this.homework.emit(this.homeworkAnswer.value.text);
  }
}
