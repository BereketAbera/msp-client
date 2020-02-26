import { TestBed } from '@angular/core/testing';
import { OrderDataSourceService } from './order-data-source.service';
describe('OrderDataSourceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(OrderDataSourceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=order-data-source.service.spec.js.map