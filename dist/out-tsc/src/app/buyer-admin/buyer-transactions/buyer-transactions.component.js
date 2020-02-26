import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatSort } from "@angular/material";
import { TransactionService } from "../../service/transaction.service";
import { tap } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { BuyerTransactionsDataSource } from "../../service/buyer-transactions-data-source.service";
var BuyerTransactionsComponent = /** @class */ (function () {
    function BuyerTransactionsComponent(route, transactionService, router) {
        this.route = route;
        this.transactionService = transactionService;
        this.router = router;
        this.balance = 0;
        this.displayedColumns = ["type", "date", "amount", "name"];
    }
    BuyerTransactionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new BuyerTransactionsDataSource(this.transactionService);
        this.dataSource.loadTransactions(1, '', 'asc', 0, 5);
        this.route.data
            .subscribe(function (data) {
            _this.balance = data.balance.amount;
        });
    };
    BuyerTransactionsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(tap(function () { return _this.loadTransactionsPage(); }))
            .subscribe();
    };
    BuyerTransactionsComponent.prototype.getAmount = function (trns) {
        if (trns.type == "DEPOSIT" || trns.type == "REFUND")
            return trns.credit;
        else
            return trns.debit;
    };
    BuyerTransactionsComponent.prototype.loadTransactionsPage = function () {
        this.dataSource.loadTransactions(1, '', this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], BuyerTransactionsComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], BuyerTransactionsComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        ViewChild('input'),
        tslib_1.__metadata("design:type", ElementRef)
    ], BuyerTransactionsComponent.prototype, "input", void 0);
    BuyerTransactionsComponent = tslib_1.__decorate([
        Component({
            templateUrl: './buyer-transactions.component.html',
            styleUrls: ['./buyer-transactions.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            TransactionService, Router])
    ], BuyerTransactionsComponent);
    return BuyerTransactionsComponent;
}());
export { BuyerTransactionsComponent };
//# sourceMappingURL=buyer-transactions.component.js.map