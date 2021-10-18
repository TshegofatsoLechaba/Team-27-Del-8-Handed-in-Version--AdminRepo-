import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportErrorPopUpComponent } from './report-error-pop-up.component';

describe('ReportErrorPopUpComponent', () => {
  let component: ReportErrorPopUpComponent;
  let fixture: ComponentFixture<ReportErrorPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportErrorPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportErrorPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
