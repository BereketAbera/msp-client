import { TestBed, inject } from '@angular/core/testing';
import { SellerGuard } from './seller.guard';
describe('SellerGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [SellerGuard]
        });
    });
    it('should ...', inject([SellerGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=seller.guard.spec.js.map