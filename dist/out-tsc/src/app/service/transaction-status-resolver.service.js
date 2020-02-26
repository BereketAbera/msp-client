import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TransactionService } from './transaction.service';
var TransactionStatusResolverService = /** @class */ (function () {
    function TransactionStatusResolverService(transactionService, router) {
        this.transactionService = transactionService;
        this.router = router;
    }
    TransactionStatusResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        var transactionId = route.paramMap.get('id');
        return this.transactionService.getTransactionStatus(transactionId).pipe(mergeMap(function (transactionStatus) {
            if (transactionStatus) {
                return of(transactionStatus);
            }
            else { // id not found
                _this.router.navigate(['./']);
                return EMPTY;
            }
        }));
    };
    TransactionStatusResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [TransactionService, Router])
    ], TransactionStatusResolverService);
    return TransactionStatusResolverService;
}());
export { TransactionStatusResolverService };
//# sourceMappingURL=transaction-status-resolver.service.js.map