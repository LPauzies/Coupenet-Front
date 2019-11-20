import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootBansMainComponent } from './root-bans-main.component';

describe('RootBansMainComponent', () => {
  let component: RootBansMainComponent;
  let fixture: ComponentFixture<RootBansMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootBansMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootBansMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
