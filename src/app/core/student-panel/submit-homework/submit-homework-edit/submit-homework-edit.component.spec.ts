import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitHomeworkEditComponent } from './submit-homework-edit.component';

describe('SubmitHomeworkEditComponent', () => {
  let component: SubmitHomeworkEditComponent;
  let fixture: ComponentFixture<SubmitHomeworkEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitHomeworkEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitHomeworkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
