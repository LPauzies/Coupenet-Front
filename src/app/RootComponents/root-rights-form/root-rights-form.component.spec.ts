import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRightsFormComponent } from './root-rights-form.component';

describe('RootRightsFormComponent', () => {
  let component: RootRightsFormComponent;
  let fixture: ComponentFixture<RootRightsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRightsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRightsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
