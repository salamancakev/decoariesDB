import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisDashboardComponent } from './analisis-dashboard.component';

describe('AnalisisDashboardComponent', () => {
  let component: AnalisisDashboardComponent;
  let fixture: ComponentFixture<AnalisisDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisisDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisisDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
