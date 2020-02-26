import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
var BuyerGuard = /** @class */ (function () {
    function BuyerGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    BuyerGuard.prototype.canActivate = function (next, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    BuyerGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    BuyerGuard.prototype.checkLogin = function (url) {
        if (this.authService.isBuyerLoggedIn()) {
            return true;
        }
        if (this.authService.isLoggedIn()) {
            this.router.navigate([this.authService.defaultNavigationURL]);
            return false;
        }
        this.authService.redirectURL = url;
        // Store the attempted URL for redirecting
        //this.authService.logout();
        // Navigate to the login page with extras
        this.router.navigate(['/login/buyer']);
        return false;
    };
    BuyerGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], BuyerGuard);
    return BuyerGuard;
}());
export { BuyerGuard };
//# sourceMappingURL=buyer.guard.js.map