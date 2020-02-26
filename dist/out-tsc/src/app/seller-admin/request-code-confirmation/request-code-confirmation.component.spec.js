import { async, TestBed } from '@angular/core/testing';
import { RequestCodeConfirmationComponent } from './request-code-confirmation.component';
describe('RequestCodeConfirmationComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [RequestCodeConfirmationComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(RequestCodeConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=request-code-confirmation.component.spec.js.map