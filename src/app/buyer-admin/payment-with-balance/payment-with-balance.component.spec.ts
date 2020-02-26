import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWithBalanceComponent } from './payment-with-balance.component';

describe('PaymentWithBalanceComponent', () => {
  let component: PaymentWithBalanceComponent;
  let fixture: ComponentFixture<PaymentWithBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWithBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWithBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
