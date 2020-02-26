import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TransactionService } from './transaction.service';
var SellerOrderResolverService = /** @class */ (function () {
    function SellerOrderResolverService(transactService, router) {
        this.transactService = transactService;
        this.router = router;
    }
    SellerOrderResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        var transactionId = route.paramMap.get('id');
        return this.transactService.getSellerTransaction(transactionId).pipe(mergeMap(function (transaction) {
            if (transaction) {
                return of(transaction);
            }
            else { // id not found
                _this.router.navigate(['./']);
                return EMPTY;
            }
        }));
    };
    SellerOrderResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [TransactionService, Router])
    ], SellerOrderResolverService);
    return SellerOrderResolverService;
}());
export { SellerOrderResolverService };
//# sourceMappingURL=seller-order-resolver.service.js.map