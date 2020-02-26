import { async, TestBed } from '@angular/core/testing';
import { PaymentWithCreditCardComponent } from './payment-with-credit-card.component';
describe('PaymentWithCreditCardComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PaymentWithCreditCardComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PaymentWithCreditCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=payment-with-credit-card.component.spec.js.map