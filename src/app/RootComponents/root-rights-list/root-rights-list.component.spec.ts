import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRightsListComponent } from './root-rights-list.component';

describe('RootRightsListComponent', () => {
  let component: RootRightsListComponent;
  let fixture: ComponentFixture<RootRightsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRightsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRightsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
