import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLinkComponent } from './root-link.component';

describe('RootLinkComponent', () => {
  let component: RootLinkComponent;
  let fixture: ComponentFixture<RootLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
