import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransferlistDialogComponent } from './create-transferlist-dialog.component';

describe('CreateTransferlistDialogComponent', () => {
  let component: CreateTransferlistDialogComponent;
  let fixture: ComponentFixture<CreateTransferlistDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransferlistDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransferlistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
