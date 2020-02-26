import { async, TestBed } from '@angular/core/testing';
import { BuyerNavigationComponent } from './buyer-navigation.component';
describe('BuyerNavigationComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [BuyerNavigationComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BuyerNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=buyer-navigation.component.spec.js.map