import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatSort } from "@angular/material";
import { ShopsService } from "../../service/shops.service";
import { AuthService } from '../../service/auth.service';
import { tap } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { ShopsDataSource } from "../../service/shopsDataSource";
var ShopListComponent = /** @class */ (function () {
    function ShopListComponent(authService, route, shopsService, router) {
        this.authService = authService;
        this.route = route;
        this.shopsService = shopsService;
        this.router = router;
        this.showError = false;
        this.displayedColumns = ["name", "address", "ZipCode", "contact", "phone"];
    }
    ShopListComponent.prototype.ngOnInit = function () {
        this.dataSource = new ShopsDataSource(this.shopsService);
        this.dataSource.loadShops(1, '', 'asc', 0, 5);
    };
    ShopListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(tap(function () { return _this.loadShopsPage(); }))
            .subscribe();
    };
    ShopListComponent.prototype.gotoAddNewShop = function () {
        try {
            var status_1 = this.authService.getMyStatus();
            var userStatus = parseInt(status_1.toString());
            if (userStatus == 1)
                this.router.navigate(["./newshp"], { relativeTo: this.route });
            else {
                this.showError = true;
                this.errors = ["Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com."];
            }
        }
        catch (err) {
            this.showError = true;
            this.errors = ["Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com."];
        }
    };
    ShopListComponent.prototype.loadShopsPage = function () {
        this.dataSource.loadShops(1, '', this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    };
    ShopListComponent.prototype.close = function () {
        this.showError = false;
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], ShopListComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], ShopListComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        ViewChild('input'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ShopListComponent.prototype, "input", void 0);
    ShopListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-shop-list',
            templateUrl: './shop-list.component.html',
            styleUrls: ['./shop-list.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, ActivatedRoute,
            ShopsService, Router])
    ], ShopListComponent);
    return ShopListComponent;
}());
export { ShopListComponent };
//# sourceMappingURL=shop-list.component.js.map