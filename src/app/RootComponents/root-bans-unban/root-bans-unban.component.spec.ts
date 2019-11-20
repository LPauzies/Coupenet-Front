import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootBansUnbanComponent } from './root-bans-unban.component';

describe('RootBansUnbanComponent', () => {
  let component: RootBansUnbanComponent;
  let fixture: ComponentFixture<RootBansUnbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootBansUnbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootBansUnbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
