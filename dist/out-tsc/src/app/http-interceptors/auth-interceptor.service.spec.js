import { TestBed } from '@angular/core/testing';
import { AuthInterceptorService } from './auth-interceptor.service';
describe('AuthInterceptorService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(AuthInterceptorService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=auth-interceptor.service.spec.js.map