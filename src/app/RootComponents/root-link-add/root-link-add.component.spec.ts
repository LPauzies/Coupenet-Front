import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLinkAddComponent } from './root-link-add.component';

describe('RootLinkAddComponent', () => {
  let component: RootLinkAddComponent;
  let fixture: ComponentFixture<RootLinkAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLinkAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLinkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
