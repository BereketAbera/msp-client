import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from './transaction.service';
var BuyerSupplierResolverService = /** @class */ (function () {
    function BuyerSupplierResolverService(trnsctService, router) {
        this.trnsctService = trnsctService;
        this.router = router;
    }
    BuyerSupplierResolverService.prototype.resolve = function (route, state) {
        var transactionId = route.paramMap.get('id');
        return this.trnsctService.getSupplier(transactionId);
    };
    BuyerSupplierResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [TransactionService, Router])
    ], BuyerSupplierResolverService);
    return BuyerSupplierResolverService;
}());
export { BuyerSupplierResolverService };
//# sourceMappingURL=buyer-supplier-resolver.service.js.map