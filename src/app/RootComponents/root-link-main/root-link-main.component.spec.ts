import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLinkMainComponent } from './root-link-main.component';

describe('RootLinkMainComponent', () => {
  let component: RootLinkMainComponent;
  let fixture: ComponentFixture<RootLinkMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLinkMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLinkMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
