import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootAlumniComponent } from './root-alumni.component';

describe('RootAlumniComponent', () => {
  let component: RootAlumniComponent;
  let fixture: ComponentFixture<RootAlumniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootAlumniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
