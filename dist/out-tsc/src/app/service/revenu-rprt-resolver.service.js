import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
var RevenuRprtResolverService = /** @class */ (function () {
    function RevenuRprtResolverService(userSerice, router) {
        this.userSerice = userSerice;
        this.router = router;
    }
    RevenuRprtResolverService.prototype.resolve = function (route, state) {
        return this.userSerice.getRevenuReport();
    };
    RevenuRprtResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router])
    ], RevenuRprtResolverService);
    return RevenuRprtResolverService;
}());
export { RevenuRprtResolverService };
//# sourceMappingURL=revenu-rprt-resolver.service.js.map