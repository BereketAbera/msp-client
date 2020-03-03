import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort } from "@angular/material";
import { UserService } from "../../service/user.service";
import { tap } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { DailySalesDataSource } from "../../service/daily-sales-data-source.service";
var SalesSummaryComponent = /** @class */ (function () {
    function SalesSummaryComponent(route, userService, router) {
        this.route = route;
        this.userService = userService;
        this.router = router;
        this.balance = 0;
        this.displayedColumns = ["product", "normalPrice", "offeredQty", "soldQty", "picked", "discount"];
        this.date = new FormControl(new Date());
    }
    SalesSummaryComponent.prototype.ngOnInit = function () {
        this.dataSource = new DailySalesDataSource(this.userService);
        this.dataSource.loadTransactions(this.date.value);
    };
    SalesSummaryComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(tap(function () { return _this.loadTransactionsPage(); }))
            .subscribe();
    };
    SalesSummaryComponent.prototype.search = function () {
    };
    SalesSummaryComponent.prototype.loadTransactionsPage = function () {
        this.dataSource.loadTransactions(this.date.value);
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], SalesSummaryComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], SalesSummaryComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        ViewChild('input'),
        tslib_1.__metadata("design:type", ElementRef)
    ], SalesSummaryComponent.prototype, "input", void 0);
    SalesSummaryComponent = tslib_1.__decorate([
        Component({
            selector: 'app-sales-summary',
            templateUrl: './sales-summary.component.html',
            styleUrls: ['./sales-summary.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            UserService, Router])
    ], SalesSummaryComponent);
    return SalesSummaryComponent;
}());
export { SalesSummaryComponent };
//# sourceMappingURL=sales-summary.component.js.map