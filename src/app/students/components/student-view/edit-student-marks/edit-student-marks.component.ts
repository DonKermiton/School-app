import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {studentsService} from "../../../services/students.service";

@Component({
  selector: 'app-edit-student-marks',
  templateUrl: './edit-student-marks.component.html',
  styleUrls: ['./edit-student-marks.component.css']
})
export class EditStudentMarksComponent implements OnInit {
  marksForm: FormGroup;
  userUID: string;
  userMarks = [];
  selectedGroup: string;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: studentsService,
              private router: Router) {
  }

  get controls(){
    return (<FormArray> this.marksForm.get('marks')).controls;
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

  private initForm(){
    const marksArray = new FormArray([]);
     this.studentService.getMarks(this.userUID).subscribe((value: any) => {
       for(const mark of value.marks){
         this.userMarks.push(mark);
       }
       for(const mark of this.userMarks){

         marksArray.push(
           new FormGroup({
             value: new FormControl(mark.value,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
             desc: new FormControl(mark.desc,Validators.required),
           })
         )
       }
       this.marksForm = new FormGroup({
         marks: marksArray,
       })
    });



  }

  onSubmit() {
    this.studentService.saveMarksToDatabase(this.userUID, this.marksForm);
    this.userMarks.length = 0;
    this.router.navigate(['/students-2'], {queryParams: {group: this.selectedGroup}})
  }

  addMarkField() {
    (<FormArray> this.marksForm.get('marks')).push(
      new FormGroup({
        value: new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        desc: new FormControl(null,Validators.required),

      })
    )
  }

  deleteMark(i: number) {
    (<FormArray> this.marksForm.get('marks')).removeAt(i);
  }

  cancelAdding() {
    this.router.navigate(['./'], { relativeTo: this.activatedRoute,queryParams: {group: this.selectedGroup}})
  }
}
