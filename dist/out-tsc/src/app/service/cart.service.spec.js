import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
describe('CartService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CartService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=cart.service.spec.js.map