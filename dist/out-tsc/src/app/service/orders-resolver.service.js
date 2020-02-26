import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TransactionService } from './transaction.service';
var OrdersResolverService = /** @class */ (function () {
    function OrdersResolverService(transactionService, router) {
        this.transactionService = transactionService;
        this.router = router;
    }
    OrdersResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        return this.transactionService.listTransactions(1).pipe(mergeMap(function (transactions) {
            if (transactions) {
                return of(transactions);
            }
            else { // id not found
                _this.router.navigate(['/']);
                return EMPTY;
            }
        }));
    };
    OrdersResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [TransactionService, Router])
    ], OrdersResolverService);
    return OrdersResolverService;
}());
export { OrdersResolverService };
//# sourceMappingURL=orders-resolver.service.js.map