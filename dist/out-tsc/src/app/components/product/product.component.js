import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from '../../service/product.service';
var ProductComponent = /** @class */ (function () {
    function ProductComponent(router, prdService) {
        this.router = router;
        this.prdService = prdService;
        //his.name = this.product.name;
    }
    ProductComponent.prototype.navdetail = function (product) {
        this.router.navigate(["/deal", product.id]);
    };
    ProductComponent.prototype.ngOnInit = function () {
        //if(this.product){
        //this.prdService.getShopInfo(this.product.id, 40.712776, -74.005974).subscribe(rslt => {
        //this.address = rslt.address;
        //this.distance = rslt.distance;
        //this.city = rslt.city;
        //this.shopInfo = this.city + " " + this.distance + " mi";
        //});
        //}
        //console.log(this.product.id);
    };
    ProductComponent.prototype.getShopInfo = function (prdId) {
        var _this = this;
        this.prdService.getShopInfo(prdId, 40.712776, -74.005974).subscribe(function (rslt) {
            _this.address = rslt.address;
            _this.distance = rslt.distance;
            _this.shopInfo = _this.address + " " + _this.distance + " mi";
        });
    };
    ProductComponent.prototype.ngAfterViewChecked = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Product)
    ], ProductComponent.prototype, "product", void 0);
    ProductComponent = tslib_1.__decorate([
        Component({
            selector: 'app-product',
            templateUrl: './product.component.html',
            styleUrls: ['./product.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ProductService])
    ], ProductComponent);
    return ProductComponent;
}());
export { ProductComponent };
//# sourceMappingURL=product.component.js.map