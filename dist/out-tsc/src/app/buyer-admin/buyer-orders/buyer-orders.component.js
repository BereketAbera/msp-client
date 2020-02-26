import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TransactionService } from "../../service/transaction.service";
var BuyerOrdersComponent = /** @class */ (function () {
    //displayedColumns= ["name","status","quantity","price","totalPrice","ViewOrder"];
    //@ViewChild(MatPaginator) paginator: MatPaginator;
    ////@ViewChild(MatSort) sort: MatSort;
    //@ViewChild('input') input: ElementRef;
    function BuyerOrdersComponent(route, transactionService, router) {
        this.route = route;
        this.transactionService = transactionService;
        this.router = router;
    }
    BuyerOrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.orders = data.orders;
        });
        //this.dataSource = new TransactionsDataSource(this.transactionService);
        //this.dataSource.loadTransactions(1, '', 'asc', 0, 5);
    };
    BuyerOrdersComponent.prototype.ngAfterViewInit = function () {
        //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        // merge(this.sort.sortChange, this.paginator.page)
        //.pipe(
        //tap(() => this.loadTransactionsPage())
        ////)
        //.subscribe();
    };
    BuyerOrdersComponent.prototype.getStatus = function (transaction) {
        var prdPickupEndTime = new Date(transaction.product.pickupEndTime);
        var purchaseTime = new Date(transaction.purchaseTime);
        var pickupEndTime = new Date(purchaseTime.getFullYear(), purchaseTime.getMonth(), purchaseTime.getDate(), prdPickupEndTime.getHours(), prdPickupEndTime.getMinutes(), prdPickupEndTime.getSeconds()).getTime();
        //let pickupEndTime = new Date(transaction.product.purchaseTime).getTime();
        var status = "Pending";
        if (transaction.isScanneded) {
            if (transaction.status == 1) {
                status = "Picked Up";
            }
            else if (transaction.status == 2) {
                status = "Rejected";
            }
            else {
                status = pickupEndTime < Date.now() ? "Rejected" : "Pending";
            }
        }
        else {
            status = pickupEndTime < Date.now() ? "Expired" : "Pending";
        }
        return status;
    };
    BuyerOrdersComponent.prototype.gotoAddNewProduct = function () {
        this.router.navigate(["./nwadtlgu"], { relativeTo: this.route });
    };
    BuyerOrdersComponent.prototype.showOrders = function () {
        if (this.orders.length > 0)
            return true;
        return false;
    };
    BuyerOrdersComponent.prototype.loadTransactionsPage = function () {
        /*this.dataSource.loadTransactions(
            1,
            'name',
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);*/
    };
    BuyerOrdersComponent = tslib_1.__decorate([
        Component({
            templateUrl: './buyer-orders.component.html',
            styleUrls: ['./buyer-orders.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            TransactionService, Router])
    ], BuyerOrdersComponent);
    return BuyerOrdersComponent;
}());
export { BuyerOrdersComponent };
//# sourceMappingURL=buyer-orders.component.js.map