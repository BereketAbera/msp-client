import { async, TestBed } from '@angular/core/testing';
import { SaveSuccessNotifierComponent } from './save-success-notifier.component';
describe('SaveSuccessNotifierComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SaveSuccessNotifierComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SaveSuccessNotifierComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=save-success-notifier.component.spec.js.map