import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootBansComponent } from './root-rights.component';

describe('RootBansComponent', () => {
  let component: RootBansComponent;
  let fixture: ComponentFixture<RootBansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootBansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootBansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
