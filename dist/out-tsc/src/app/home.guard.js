import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
var HomeGuard = /** @class */ (function () {
    function HomeGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    HomeGuard.prototype.canActivate = function (next, state) {
        if (this.authService.isSellerLoggedIn()) {
            console.log("seller sellere");
            this.router.navigate(['/tlgu-slr']);
            return false;
        }
        return true;
    };
    HomeGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], HomeGuard);
    return HomeGuard;
}());
export { HomeGuard };
//# sourceMappingURL=home.guard.js.map