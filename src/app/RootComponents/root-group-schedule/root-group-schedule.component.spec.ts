import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootGroupScheduleComponent } from './root-group-schedule.component';

describe('RootGroupScheduleComponent', () => {
  let component: RootGroupScheduleComponent;
  let fixture: ComponentFixture<RootGroupScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootGroupScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootGroupScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
