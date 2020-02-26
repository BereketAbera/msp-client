import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWithCreditCardComponent } from './payment-with-credit-card.component';

describe('PaymentWithCreditCardComponent', () => {
  let component: PaymentWithCreditCardComponent;
  let fixture: ComponentFixture<PaymentWithCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWithCreditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWithCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
