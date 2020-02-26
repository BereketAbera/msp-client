import { async, TestBed } from '@angular/core/testing';
import { PaymentWithSavedCreditCardComponent } from './payment-with-saved-credit-card.component';
describe('PaymentWithSavedCreditCardComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PaymentWithSavedCreditCardComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PaymentWithSavedCreditCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=payment-with-saved-credit-card.component.spec.js.map