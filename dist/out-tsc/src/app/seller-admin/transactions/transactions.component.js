import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatSort } from "@angular/material";
import { TransactionService } from "../../service/transaction.service";
import { tap } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { SellerOrderDataSource } from "../../service/seller-order-datasource";
var TransactionsComponent = /** @class */ (function () {
    function TransactionsComponent(route, transactionService, router) {
        this.route = route;
        this.transactionService = transactionService;
        this.router = router;
        this.balance = 0;
        this.displayedColumns = ["product", "status", "date", "totalPrice", "name"];
    }
    TransactionsComponent.prototype.ngOnInit = function () {
        this.dataSource = new SellerOrderDataSource(this.transactionService);
        this.dataSource.loadTransactions(1, '', 'asc', 0, 5);
    };
    TransactionsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(tap(function () { return _this.loadTransactionsPage(); }))
            .subscribe();
    };
    TransactionsComponent.prototype.gotoAddNewProduct = function () {
        this.router.navigate(["./nwadtlgu"], { relativeTo: this.route });
    };
    TransactionsComponent.prototype.loadTransactionsPage = function () {
        this.dataSource.loadTransactions(1, '', this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], TransactionsComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], TransactionsComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        ViewChild('input'),
        tslib_1.__metadata("design:type", ElementRef)
    ], TransactionsComponent.prototype, "input", void 0);
    TransactionsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-transactions',
            templateUrl: './transactions.component.html',
            styleUrls: ['./transactions.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            TransactionService, Router])
    ], TransactionsComponent);
    return TransactionsComponent;
}());
export { TransactionsComponent };
//# sourceMappingURL=transactions.component.js.map