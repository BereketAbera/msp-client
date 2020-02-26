import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CategoryService } from './category.service';
var CategoryResolverService = /** @class */ (function () {
    function CategoryResolverService(categorySerice, router) {
        this.categorySerice = categorySerice;
        this.router = router;
    }
    CategoryResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        return this.categorySerice.listCategory().pipe(mergeMap(function (categories) {
            if (categories) {
                return of(categories);
            }
            else { // id not found
                _this.router.navigate(['./shops/newshp']);
                return EMPTY;
            }
        }));
    };
    CategoryResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [CategoryService, Router])
    ], CategoryResolverService);
    return CategoryResolverService;
}());
export { CategoryResolverService };
//# sourceMappingURL=category-resolver.service.js.map