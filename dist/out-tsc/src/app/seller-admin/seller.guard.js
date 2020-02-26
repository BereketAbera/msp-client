import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
var SellerGuard = /** @class */ (function () {
    function SellerGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    SellerGuard.prototype.canActivate = function (next, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    SellerGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    SellerGuard.prototype.checkLogin = function (url) {
        if (this.authService.isSellerLoggedIn()) {
            return true;
        }
        if (this.authService.isLoggedIn()) {
            this.router.navigate([this.authService.defaultNavigationURL]);
            return false;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectURL = url;
        // Navigate to the login page with extras
        this.router.navigate(['/login/seller']);
        return false;
    };
    SellerGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], SellerGuard);
    return SellerGuard;
}());
export { SellerGuard };
//# sourceMappingURL=seller.guard.js.map