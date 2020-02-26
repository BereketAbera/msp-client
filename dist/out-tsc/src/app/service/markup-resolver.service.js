import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
var MarkupResolverService = /** @class */ (function () {
    function MarkupResolverService(productService, router) {
        this.productService = productService;
        this.router = router;
    }
    MarkupResolverService.prototype.resolve = function (route, state) {
        return this.productService.getMarkup();
    };
    MarkupResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [ProductService, Router])
    ], MarkupResolverService);
    return MarkupResolverService;
}());
export { MarkupResolverService };
//# sourceMappingURL=markup-resolver.service.js.map