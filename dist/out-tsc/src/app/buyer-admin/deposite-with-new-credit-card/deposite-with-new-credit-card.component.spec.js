import { async, TestBed } from '@angular/core/testing';
import { DepositeWithNewCreditCardComponent } from './deposite-with-new-credit-card.component';
describe('DepositeWithNewCreditCardComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DepositeWithNewCreditCardComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DepositeWithNewCreditCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=deposite-with-new-credit-card.component.spec.js.map