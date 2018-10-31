import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedOrdersComponent } from './deleted-orders.component';

describe('DeletedOrdersComponent', () => {
  let component: DeletedOrdersComponent;
  let fixture: ComponentFixture<DeletedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
