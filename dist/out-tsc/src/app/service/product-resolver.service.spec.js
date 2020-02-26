import { TestBed } from '@angular/core/testing';
import { ProductResolverService } from './product-resolver.service';
describe('ProductResolverService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ProductResolverService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=product-resolver.service.spec.js.map