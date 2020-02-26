import { TestBed, inject } from '@angular/core/testing';
import { HomeGuard } from './home.guard';
describe('HomeGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [HomeGuard]
        });
    });
    it('should ...', inject([HomeGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=home.guard.spec.js.map