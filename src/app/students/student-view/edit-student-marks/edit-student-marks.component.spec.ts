import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentMarksComponent } from './edit-student-marks.component';

describe('EditStudentMarksComponent', () => {
  let component: EditStudentMarksComponent;
  let fixture: ComponentFixture<EditStudentMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
