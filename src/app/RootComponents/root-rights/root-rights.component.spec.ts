import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRightsComponent } from './root-rights.component';

describe('RootRightsComponent', () => {
  let component: RootRightsComponent;
  let fixture: ComponentFixture<RootRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
