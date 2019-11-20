import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootGroupSearchComponent } from './root-group-search.component';

describe('RootGroupSearchComponent', () => {
  let component: RootGroupSearchComponent;
  let fixture: ComponentFixture<RootGroupSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootGroupSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootGroupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
