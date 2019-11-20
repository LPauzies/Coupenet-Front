import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLinkListComponent } from './root-link-list.component';

describe('RootLinkListComponent', () => {
  let component: RootLinkListComponent;
  let fixture: ComponentFixture<RootLinkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLinkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
