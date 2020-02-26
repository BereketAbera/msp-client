import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
describe('ProductService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ProductService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=product.service.spec.js.map