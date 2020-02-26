import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
var CreditCardsResolverService = /** @class */ (function () {
    function CreditCardsResolverService(userSerice, router) {
        this.userSerice = userSerice;
        this.router = router;
    }
    CreditCardsResolverService.prototype.resolve = function (route, state) {
        return this.userSerice.getGreditCards();
    };
    CreditCardsResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router])
    ], CreditCardsResolverService);
    return CreditCardsResolverService;
}());
export { CreditCardsResolverService };
//# sourceMappingURL=credit-cards-resolver.service.js.map