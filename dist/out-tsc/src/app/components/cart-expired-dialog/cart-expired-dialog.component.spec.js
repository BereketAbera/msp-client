import { async, TestBed } from '@angular/core/testing';
import { CartExpiredDialogComponent } from './cart-expired-dialog.component';
describe('CartExpiredDialogComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CartExpiredDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CartExpiredDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=cart-expired-dialog.component.spec.js.map