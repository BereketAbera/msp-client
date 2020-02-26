import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
var BalanceResolverService = /** @class */ (function () {
    function BalanceResolverService(userSerice, router) {
        this.userSerice = userSerice;
        this.router = router;
    }
    BalanceResolverService.prototype.resolve = function (route, state) {
        return this.userSerice.getBalance();
    };
    BalanceResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router])
    ], BalanceResolverService);
    return BalanceResolverService;
}());
export { BalanceResolverService };
//# sourceMappingURL=balance-resolver.service.js.map