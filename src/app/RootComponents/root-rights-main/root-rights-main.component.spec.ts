import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRightsMainComponent } from './root-rights-main.component';

describe('RootRightsMainComponent', () => {
  let component: RootRightsMainComponent;
  let fixture: ComponentFixture<RootRightsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRightsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRightsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
