import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
var AdminGuard = /** @class */ (function () {
    function AdminGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function (next, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    AdminGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    AdminGuard.prototype.checkLogin = function (url) {
        if (this.authService.isAdminLoggedIn()) {
            return true;
        }
        if (this.authService.isLoggedIn()) {
            this.router.navigate([this.authService.defaultNavigationURL]);
            return false;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectURL = url;
        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    };
    AdminGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], AdminGuard);
    return AdminGuard;
}());
export { AdminGuard };
//# sourceMappingURL=admin.guard.js.map