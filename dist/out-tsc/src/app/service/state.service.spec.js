import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';
describe('StateService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(StateService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=state.service.spec.js.map