import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserService } from './user.service';
var BuyerDepositResolverService = /** @class */ (function () {
    function BuyerDepositResolverService(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    BuyerDepositResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        var transactionId = route.paramMap.get('id');
        return this.userService.getDeposit(transactionId).pipe(mergeMap(function (deposit) {
            if (deposit) {
                return of(deposit);
            }
            else { // id not found
                _this.router.navigate(['./']);
                return EMPTY;
            }
        }));
    };
    BuyerDepositResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router])
    ], BuyerDepositResolverService);
    return BuyerDepositResolverService;
}());
export { BuyerDepositResolverService };
//# sourceMappingURL=buyer-deposit-resolver.service.js.map