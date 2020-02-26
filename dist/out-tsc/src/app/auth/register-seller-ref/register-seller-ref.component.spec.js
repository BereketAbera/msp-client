import { async, TestBed } from '@angular/core/testing';
import { RegisterSellerRefComponent } from './register-seller-ref.component';
describe('RegisterSellerRefComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [RegisterSellerRefComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(RegisterSellerRefComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=register-seller-ref.component.spec.js.map