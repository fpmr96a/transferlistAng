import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOneDialogComponent } from './delete-one-dialog.component';

describe('DeleteOneDialogComponent', () => {
  let component: DeleteOneDialogComponent;
  let fixture: ComponentFixture<DeleteOneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOneDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
