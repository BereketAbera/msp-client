import { async, TestBed } from '@angular/core/testing';
import { BuyerOrderDetailComponent } from './buyer-order-detail.component';
describe('BuyerOrderDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [BuyerOrderDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BuyerOrderDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=buyer-order-detail.component.spec.js.map