import { TestBed } from '@angular/core/testing';
import { ProductsDataSourceService } from './products-data-source.service';
describe('ProductsDataSourceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ProductsDataSourceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=products-data-source.service.spec.js.map