import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserService } from './user.service';
var BuyerOrderResolverService = /** @class */ (function () {
    function BuyerOrderResolverService(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    BuyerOrderResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        var transactionId = route.paramMap.get('id');
        return this.userService.getTransaction(transactionId).pipe(mergeMap(function (transaction) {
            if (transaction) {
                return of(transaction);
            }
            else { // id not found
                _this.router.navigate(['./']);
                return EMPTY;
            }
        }));
    };
    BuyerOrderResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router])
    ], BuyerOrderResolverService);
    return BuyerOrderResolverService;
}());
export { BuyerOrderResolverService };
//# sourceMappingURL=buyer-order-resolver.service.js.map