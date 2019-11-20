import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRedButtonComponent } from './root-red-button.component';

describe('RootRedButtonComponent', () => {
  let component: RootRedButtonComponent;
  let fixture: ComponentFixture<RootRedButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRedButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
