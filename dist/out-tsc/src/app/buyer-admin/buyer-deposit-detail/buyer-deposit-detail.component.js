import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
var BuyerDepositDetailComponent = /** @class */ (function () {
    function BuyerDepositDetailComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    BuyerDepositDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.deposit = data.deposit;
        });
    };
    BuyerDepositDetailComponent.prototype.gotoBuyerTrans = function () {
        this.router.navigate(["../../trnsctns"], { relativeTo: this.route });
    };
    BuyerDepositDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-buyer-deposit-detail',
            templateUrl: './buyer-deposit-detail.component.html',
            styleUrls: ['./buyer-deposit-detail.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router])
    ], BuyerDepositDetailComponent);
    return BuyerDepositDetailComponent;
}());
export { BuyerDepositDetailComponent };
//# sourceMappingURL=buyer-deposit-detail.component.js.map