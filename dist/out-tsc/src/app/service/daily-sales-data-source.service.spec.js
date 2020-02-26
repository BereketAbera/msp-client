import { TestBed } from '@angular/core/testing';
import { DailySalesDataSourceService } from './daily-sales-data-source.service';
describe('DailySalesDataSourceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DailySalesDataSourceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=daily-sales-data-source.service.spec.js.map