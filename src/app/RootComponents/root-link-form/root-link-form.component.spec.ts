import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLinkFormComponent } from './root-link-form.component';

describe('RootLinkFormComponent', () => {
  let component: RootLinkFormComponent;
  let fixture: ComponentFixture<RootLinkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLinkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
