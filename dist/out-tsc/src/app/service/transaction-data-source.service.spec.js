import { TestBed } from '@angular/core/testing';
import { TransactionDataSourceService } from './transaction-data-source.service';
describe('TransactionDataSourceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(TransactionDataSourceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=transaction-data-source.service.spec.js.map