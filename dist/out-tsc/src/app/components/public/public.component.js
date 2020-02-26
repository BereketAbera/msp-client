import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
var PublicComponent = /** @class */ (function () {
    function PublicComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.name = "";
    }
    PublicComponent.prototype.ngOnInit = function () {
        if (this.isLoggedIn())
            this.name = this.authService.getName();
    };
    PublicComponent.prototype.gotoAdmin = function () {
        this.router.navigate(['./tlgu-byr']);
    };
    PublicComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    PublicComponent.prototype.logout = function () {
        this.authService.logout();
    };
    PublicComponent = tslib_1.__decorate([
        Component({
            selector: 'app-public',
            templateUrl: './public.component.html',
            styleUrls: ['./public.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], PublicComponent);
    return PublicComponent;
}());
export { PublicComponent };
//# sourceMappingURL=public.component.js.map