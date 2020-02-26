import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
describe('CategoryService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CategoryService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=category.service.spec.js.map