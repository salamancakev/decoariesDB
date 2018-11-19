import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisProductComponent } from './analysis-product.component';

describe('AnalysisProductComponent', () => {
  let component: AnalysisProductComponent;
  let fixture: ComponentFixture<AnalysisProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
