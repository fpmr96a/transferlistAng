import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTransferlistComponent } from './my-transferlist.component';

describe('MyTransferlistComponent', () => {
  let component: MyTransferlistComponent;
  let fixture: ComponentFixture<MyTransferlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTransferlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTransferlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
