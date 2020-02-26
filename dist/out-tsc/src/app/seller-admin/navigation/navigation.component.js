import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(router, authService, route) {
        this.router = router;
        this.authService = authService;
        this.route = route;
        this.background = 'primary';
        this.links = [];
        this.name = "";
    }
    NavigationComponent.prototype.ngOnInit = function () {
        this.name = this.authService.getName();
    };
    NavigationComponent.prototype.gotoOrderHistory = function () {
        this.router.navigate(['./trnsctns'], { relativeTo: this.route });
    };
    NavigationComponent.prototype.gotoStore = function () {
        this.router.navigate(['./shops'], { relativeTo: this.route });
    };
    NavigationComponent.prototype.gotoGallery = function () {
        this.router.navigate(['./gallery'], { relativeTo: this.route });
    };
    NavigationComponent.prototype.gotoProductMngmnt = function () {
        this.router.navigate(['./prdcts'], { relativeTo: this.route });
    };
    NavigationComponent.prototype.salesSummary = function () {
        this.router.navigate(['./slssmry'], { relativeTo: this.route });
    };
    NavigationComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/']);
    };
    NavigationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-navigation',
            templateUrl: './navigation.component.html',
            styleUrls: ['./navigation.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, AuthService, ActivatedRoute])
    ], NavigationComponent);
    return NavigationComponent;
}());
export { NavigationComponent };
//# sourceMappingURL=navigation.component.js.map