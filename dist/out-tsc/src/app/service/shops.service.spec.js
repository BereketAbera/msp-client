import { TestBed } from '@angular/core/testing';
import { ShopsService } from './shops.service';
describe('ShopService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ShopsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=shops.service.spec.js.map