import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitHomeworkComponent } from './submit-homework.component';

describe('SubmitHomeworkComponent', () => {
  let component: SubmitHomeworkComponent;
  let fixture: ComponentFixture<SubmitHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
