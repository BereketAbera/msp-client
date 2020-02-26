import { TestBed } from '@angular/core/testing';
import { GeocoderService } from './geocoder.service';
describe('GeocoderService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(GeocoderService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=geocoder.service.spec.js.map