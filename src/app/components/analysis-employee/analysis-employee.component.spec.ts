import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisEmployeeComponent } from './analysis-employee.component';

describe('AnalysisEmployeeComponent', () => {
  let component: AnalysisEmployeeComponent;
  let fixture: ComponentFixture<AnalysisEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
