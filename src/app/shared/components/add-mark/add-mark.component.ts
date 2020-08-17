import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-add-mark',
  templateUrl: './add-mark.component.html',
  styleUrls: ['./add-mark.component.css'],

})
export class AddMarkComponent implements OnInit {
  addMarkForm: FormGroup;
  @Output() closePopUp = new EventEmitter<void>();
  @Output() addedMark = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
   this.initForm();

  }

  private initForm(){
    this.addMarkForm = new FormGroup({
      value: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      desc: new FormControl(null, Validators.required),
    })
  }

  onClose(){
    this.closePopUp.emit();
  }


  onSubmit() {
    this.addedMark.emit(this.addMarkForm);
  }
}
