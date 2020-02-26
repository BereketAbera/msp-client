import { async, TestBed } from '@angular/core/testing';
import { RegisterBuyerRefComponent } from './register-buyer-ref.component';
describe('RegisterBuyerRefComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [RegisterBuyerRefComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(RegisterBuyerRefComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=register-buyer-ref.component.spec.js.map