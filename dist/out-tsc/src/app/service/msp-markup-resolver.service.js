import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
var MspMarkupResolverService = /** @class */ (function () {
    function MspMarkupResolverService(productService, router) {
        this.productService = productService;
        this.router = router;
    }
    MspMarkupResolverService.prototype.resolve = function (route, state) {
        var prdctId = +route.paramMap.get('id');
        return this.productService.getMSPMarkup(prdctId);
    };
    MspMarkupResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [ProductService, Router])
    ], MspMarkupResolverService);
    return MspMarkupResolverService;
}());
export { MspMarkupResolverService };
//# sourceMappingURL=msp-markup-resolver.service.js.map