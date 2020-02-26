import { async, TestBed } from '@angular/core/testing';
import { SaveConfirmationDialogComponent } from './save-confirmation-dialog.component';
describe('SaveConfirmationDialogComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SaveConfirmationDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SaveConfirmationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=save-confirmation-dialog.component.spec.js.map