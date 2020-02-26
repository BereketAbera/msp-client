import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
var AdminNavigationComponent = /** @class */ (function () {
    function AdminNavigationComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.background = 'primary';
        this.links = [];
        this.name = "";
    }
    AdminNavigationComponent.prototype.ngOnInit = function () {
        this.name = this.authService.getName();
    };
    AdminNavigationComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/']);
    };
    AdminNavigationComponent = tslib_1.__decorate([
        Component({
            selector: 'admin-navigation',
            templateUrl: './admin-navigation.component.html',
            styleUrls: ['./admin-navigation.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, AuthService])
    ], AdminNavigationComponent);
    return AdminNavigationComponent;
}());
export { AdminNavigationComponent };
//# sourceMappingURL=admin-navigation.component.js.map