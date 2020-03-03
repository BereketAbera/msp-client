import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
var SellerOrderDetailComponent = /** @class */ (function () {
    function SellerOrderDetailComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    SellerOrderDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.order = data.order;
        });
    };
    SellerOrderDetailComponent.prototype.gotoSellerTrans = function () {
        this.router.navigate(["../"], { relativeTo: this.route });
    };
    SellerOrderDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-seller-order-detail',
            templateUrl: './seller-order-detail.component.html',
            styleUrls: ['./seller-order-detail.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router])
    ], SellerOrderDetailComponent);
    return SellerOrderDetailComponent;
}());
export { SellerOrderDetailComponent };
//# sourceMappingURL=seller-order-detail.component.js.map