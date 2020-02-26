import { async, TestBed } from '@angular/core/testing';
import { BuyerItemQrcodeComponent } from './buyer-item-qrcode.component';
describe('BuyerItemQrcodeComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [BuyerItemQrcodeComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BuyerItemQrcodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=buyer-item-qrcode.component.spec.js.map