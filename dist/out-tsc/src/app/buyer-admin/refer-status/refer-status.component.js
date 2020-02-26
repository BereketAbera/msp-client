import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatSort } from "@angular/material";
import { UserService } from "../../service/user.service";
import { RefersDataSource } from '../../service/refers-data-source.service';
import { tap } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
var ReferStatusComponent = /** @class */ (function () {
    function ReferStatusComponent(route, userService, router) {
        this.route = route;
        this.userService = userService;
        this.router = router;
        this.balance = 0;
        this.displayedColumns = ["email", "type", "isUsed", "createdAt"];
    }
    ReferStatusComponent.prototype.ngOnInit = function () {
        this.dataSource = new RefersDataSource(this.userService);
        this.dataSource.loadRefers('', 'asc', 0, 5);
    };
    ReferStatusComponent.prototype.getType = function (type) {
        if (type == 2)
            return "Seller";
        return "Buyer";
    };
    ReferStatusComponent.prototype.isRegistered = function (isRegistered) {
        if (isRegistered)
            return "Yes";
        return "No";
    };
    ReferStatusComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(tap(function () { return _this.loadTransactionsPage(); }))
            .subscribe();
    };
    ReferStatusComponent.prototype.loadTransactionsPage = function () {
        this.dataSource.loadRefers('', this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], ReferStatusComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], ReferStatusComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        ViewChild('input'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ReferStatusComponent.prototype, "input", void 0);
    ReferStatusComponent = tslib_1.__decorate([
        Component({
            selector: 'app-refer-status',
            templateUrl: './refer-status.component.html',
            styleUrls: ['./refer-status.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            UserService, Router])
    ], ReferStatusComponent);
    return ReferStatusComponent;
}());
export { ReferStatusComponent };
//# sourceMappingURL=refer-status.component.js.map