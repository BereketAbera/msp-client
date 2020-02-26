import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
describe('TransactionService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(TransactionService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=transaction.service.spec.js.map