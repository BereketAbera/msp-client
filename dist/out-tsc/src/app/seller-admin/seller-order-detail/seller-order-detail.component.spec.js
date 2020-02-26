import { async, TestBed } from '@angular/core/testing';
import { SellerOrderDetailComponent } from './seller-order-detail.component';
describe('SellerOrderDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SellerOrderDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SellerOrderDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=seller-order-detail.component.spec.js.map