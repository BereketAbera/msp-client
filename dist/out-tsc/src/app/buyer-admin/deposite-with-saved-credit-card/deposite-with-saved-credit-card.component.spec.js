import { async, TestBed } from '@angular/core/testing';
import { DepositeWithSavedCreditCardComponent } from './deposite-with-saved-credit-card.component';
describe('DepositeWithSavedCreditCardComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DepositeWithSavedCreditCardComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DepositeWithSavedCreditCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=deposite-with-saved-credit-card.component.spec.js.map