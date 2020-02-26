import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ProductService } from './product.service';
var ProductResolverService = /** @class */ (function () {
    function ProductResolverService(productService, router) {
        this.productService = productService;
        this.router = router;
    }
    ProductResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        var prdctId = route.paramMap.get('id');
        return this.productService.getProduct(prdctId).pipe(mergeMap(function (product) {
            if (product) {
                return of(product);
            }
            else { // id not found
                _this.router.navigate(['./']);
                return EMPTY;
            }
        }));
    };
    ProductResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [ProductService, Router])
    ], ProductResolverService);
    return ProductResolverService;
}());
export { ProductResolverService };
//# sourceMappingURL=product-resolver.service.js.map