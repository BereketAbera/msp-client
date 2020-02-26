import { TestBed, inject } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
describe('AdminGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [AdminGuard]
        });
    });
    it('should ...', inject([AdminGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=admin.guard.spec.js.map