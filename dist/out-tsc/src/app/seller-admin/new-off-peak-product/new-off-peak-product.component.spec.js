import { async, TestBed } from '@angular/core/testing';
import { NewOffPeakProductComponent } from './new-off-peak-product.component';
describe('NewOffPeakProductComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [NewOffPeakProductComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(NewOffPeakProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=new-off-peak-product.component.spec.js.map