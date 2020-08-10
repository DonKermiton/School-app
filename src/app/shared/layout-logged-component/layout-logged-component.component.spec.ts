import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLoggedComponentComponent } from './layout-logged-component.component';

describe('LayoutLoggedComponentComponent', () => {
  let component: LayoutLoggedComponentComponent;
  let fixture: ComponentFixture<LayoutLoggedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutLoggedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutLoggedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
