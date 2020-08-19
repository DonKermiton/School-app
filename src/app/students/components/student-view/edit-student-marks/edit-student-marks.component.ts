import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {studentsService} from "../../../services/students.service";
import {MarksModel} from "../../../models/marks.model";

@Component({
  selector: 'app-edit-student-marks',
  templateUrl: './edit-student-marks.component.html',
  styleUrls: ['./edit-student-marks.component.css']
})
export class EditStudentMarksComponent implements OnInit {
  marksForm: FormGroup;
  userUID: string;
  userMarks: MarksModel;
  selectedGroup: string;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: studentsService,
              private router: Router) {
  }

  get controls() {
    return (<FormArray>this.marksForm.get('marks')).controls;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param: Params) => {
      this.selectedGroup = param.group;
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.userUID = params['edit'];
    })
    this.initForm();

  }

  onSubmit() {
    this.studentService.saveMarksToDatabase(this.userUID, this.marksForm.value, this.selectedGroup);
    console.log(this.marksForm.value.marks);
    // this.userMarks.length = 0;
    this.router.navigate(['/students'], {queryParams: {group: this.selectedGroup}})
  }

  addMarkField() {

    (<FormArray>this.marksForm.get('marks')).push(
      new FormGroup({
        value: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        desc: new FormControl(null, Validators.required),
        add: new FormControl(null),
        date: new FormControl(new Date().toLocaleString()),
      })
    )
  }

  deleteMark(i: number) {
    (<FormArray>this.marksForm.get('marks')).removeAt(i);
  }



  private initForm() {
    const marksArray = new FormArray([]);
    this.studentService.getMarks(this.userUID, this.selectedGroup).subscribe((value: any) => {
      // console.log(value.data());

      this.userMarks = value.data();

      for(const test in this.userMarks.marks){

        console.log(this.userMarks.marks[test]);
      }


      for (const mark in this.userMarks.marks) {
        marksArray.push(
          new FormGroup({
            value: new FormControl(this.userMarks.marks[mark].value, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            desc: new FormControl(this.userMarks.marks[mark].desc, Validators.required),
            add: new FormControl(this.userMarks.marks[mark].add),
            date: new FormControl(this.userMarks.marks[mark].date),
          })
        )
      }
      this.marksForm = new FormGroup({
        marks: marksArray,
      })
    });


  }
}
