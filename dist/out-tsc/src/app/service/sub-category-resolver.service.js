import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SubCategoryService } from './sub-category.service';
var SubCategoryResolverService = /** @class */ (function () {
    function SubCategoryResolverService(subCategorySerice, router) {
        this.subCategorySerice = subCategorySerice;
        this.router = router;
    }
    SubCategoryResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        return this.subCategorySerice.listSubCategory().pipe(mergeMap(function (subCategories) {
            if (subCategories) {
                return of(subCategories);
            }
            else { // id not found
                _this.router.navigate(['./shops/newshp']);
                return EMPTY;
            }
        }));
    };
    SubCategoryResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [SubCategoryService, Router])
    ], SubCategoryResolverService);
    return SubCategoryResolverService;
}());
export { SubCategoryResolverService };
//# sourceMappingURL=sub-category-resolver.service.js.map