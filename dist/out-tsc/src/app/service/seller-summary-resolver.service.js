import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
var SellerSummaryResolverService = /** @class */ (function () {
    function SellerSummaryResolverService(userSerice, router) {
        this.userSerice = userSerice;
        this.router = router;
    }
    SellerSummaryResolverService.prototype.resolve = function (route, state) {
        return this.userSerice.getSellerSummary();
    };
    SellerSummaryResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router])
    ], SellerSummaryResolverService);
    return SellerSummaryResolverService;
}());
export { SellerSummaryResolverService };
//# sourceMappingURL=seller-summary-resolver.service.js.map