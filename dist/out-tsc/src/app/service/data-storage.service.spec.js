import { TestBed } from '@angular/core/testing';
import { DataStorageService } from './data-storage.service';
describe('DataStorageService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DataStorageService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data-storage.service.spec.js.map