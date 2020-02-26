import { async, TestBed } from '@angular/core/testing';
import { BuyerDepositDetailComponent } from './buyer-deposit-detail.component';
describe('BuyerDepositDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [BuyerDepositDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BuyerDepositDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=buyer-deposit-detail.component.spec.js.map