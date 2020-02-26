import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TransactionService } from './transaction.service';
var TransactionResolverService = /** @class */ (function () {
    function TransactionResolverService(transactionService, router) {
        this.transactionService = transactionService;
        this.router = router;
    }
    TransactionResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        var transactionId = route.paramMap.get('id');
        return this.transactionService.getTransaction(transactionId).pipe(mergeMap(function (transaction) {
            if (transaction) {
                return of(transaction);
            }
            else { // id not found
                _this.router.navigate(['./']);
                return EMPTY;
            }
        }));
    };
    TransactionResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [TransactionService, Router])
    ], TransactionResolverService);
    return TransactionResolverService;
}());
export { TransactionResolverService };
//# sourceMappingURL=transaction-resolver.service.js.map