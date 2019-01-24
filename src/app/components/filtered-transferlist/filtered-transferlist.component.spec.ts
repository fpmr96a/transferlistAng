import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredTransferlistComponent } from './filtered-transferlist.component';

describe('FilteredTransferlistComponent', () => {
  let component: FilteredTransferlistComponent;
  let fixture: ComponentFixture<FilteredTransferlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredTransferlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredTransferlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
