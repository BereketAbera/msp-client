import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOrderDetailComponent } from './buyer-order-detail.component';

describe('BuyerOrderDetailComponent', () => {
  let component: BuyerOrderDetailComponent;
  let fixture: ComponentFixture<BuyerOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
