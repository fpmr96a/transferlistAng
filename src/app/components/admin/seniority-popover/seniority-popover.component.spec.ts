import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorityPopoverComponent } from './seniority-popover.component';

describe('SeniorityPopoverComponent', () => {
  let component: SeniorityPopoverComponent;
  let fixture: ComponentFixture<SeniorityPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorityPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorityPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
