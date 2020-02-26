import { TestBed, inject } from '@angular/core/testing';
import { BuyerGuard } from './buyer.guard';
describe('BuyerGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [BuyerGuard]
        });
    });
    it('should ...', inject([BuyerGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=buyer.guard.spec.js.map