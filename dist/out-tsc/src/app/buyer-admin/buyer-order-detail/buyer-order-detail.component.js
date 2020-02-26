import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
var BuyerOrderDetailComponent = /** @class */ (function () {
    function BuyerOrderDetailComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    BuyerOrderDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.order = data.order;
            _this.supplier = data.supplier;
        });
    };
    BuyerOrderDetailComponent.prototype.gotoBuyerTrans = function () {
        this.router.navigate(["../../trnsctns"], { relativeTo: this.route });
    };
    BuyerOrderDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-buyer-order-detail',
            templateUrl: './buyer-order-detail.component.html',
            styleUrls: ['./buyer-order-detail.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router])
    ], BuyerOrderDetailComponent);
    return BuyerOrderDetailComponent;
}());
export { BuyerOrderDetailComponent };
//# sourceMappingURL=buyer-order-detail.component.js.map