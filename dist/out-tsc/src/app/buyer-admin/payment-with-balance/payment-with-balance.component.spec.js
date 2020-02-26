import { async, TestBed } from '@angular/core/testing';
import { PaymentWithBalanceComponent } from './payment-with-balance.component';
describe('PaymentWithBalanceComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PaymentWithBalanceComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PaymentWithBalanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=payment-with-balance.component.spec.js.map