import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
var BuyerNavigationComponent = /** @class */ (function () {
    function BuyerNavigationComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.background = 'primary';
        this.links = [];
        this.name = "";
    }
    BuyerNavigationComponent.prototype.ngOnInit = function () {
        this.name = this.authService.getName();
    };
    BuyerNavigationComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/']);
    };
    BuyerNavigationComponent.prototype.menuOpened = function () {
        console.log('Menu is open');
    };
    BuyerNavigationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-buyer-navigation',
            templateUrl: './buyer-navigation.component.html',
            styleUrls: ['./buyer-navigation.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, Router])
    ], BuyerNavigationComponent);
    return BuyerNavigationComponent;
}());
export { BuyerNavigationComponent };
//# sourceMappingURL=buyer-navigation.component.js.map