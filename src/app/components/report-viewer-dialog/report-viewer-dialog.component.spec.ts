import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportViewerDialogComponent } from './report-viewer-dialog.component';

describe('ReportViewerDialogComponent', () => {
  let component: ReportViewerDialogComponent;
  let fixture: ComponentFixture<ReportViewerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportViewerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
