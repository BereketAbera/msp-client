import { async, TestBed } from '@angular/core/testing';
import { TermsUseBuyerComponent } from './terms-use-buyer.component';
describe('TermsUseBuyerComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [TermsUseBuyerComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(TermsUseBuyerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=terms-use-buyer.component.spec.js.map