import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWithSavedCreditCardComponent } from './payment-with-saved-credit-card.component';

describe('PaymentWithSavedCreditCardComponent', () => {
  let component: PaymentWithSavedCreditCardComponent;
  let fixture: ComponentFixture<PaymentWithSavedCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWithSavedCreditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWithSavedCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
