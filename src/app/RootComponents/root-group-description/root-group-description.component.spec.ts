import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootGroupDescriptionComponent } from './root-group-description.component';

describe('RootGroupDescriptionComponent', () => {
  let component: RootGroupDescriptionComponent;
  let fixture: ComponentFixture<RootGroupDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootGroupDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootGroupDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
