import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisCompanyComponent } from './analysis-company.component';

describe('AnalysisCompanyComponent', () => {
  let component: AnalysisCompanyComponent;
  let fixture: ComponentFixture<AnalysisCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
