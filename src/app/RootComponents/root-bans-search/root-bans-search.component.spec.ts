import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootBansSearchComponent } from './root-bans-search.component';

describe('RootBansSearchComponent', () => {
  let component: RootBansSearchComponent;
  let fixture: ComponentFixture<RootBansSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootBansSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootBansSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
