import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ShopsService } from './shops.service';
var ShopResolverService = /** @class */ (function () {
    function ShopResolverService(shopsSerice, router) {
        this.shopsSerice = shopsSerice;
        this.router = router;
    }
    ShopResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        return this.shopsSerice.listShopsForProduct().pipe(mergeMap(function (shops) {
            if (shops) {
                return of(shops);
            }
            else { // id not found
                _this.router.navigate(['./shops/newshp']);
                return EMPTY;
            }
        }));
    };
    ShopResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [ShopsService, Router])
    ], ShopResolverService);
    return ShopResolverService;
}());
export { ShopResolverService };
//# sourceMappingURL=shop-resolver.service.js.map