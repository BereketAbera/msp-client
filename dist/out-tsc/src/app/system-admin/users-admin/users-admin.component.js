import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatSort } from "@angular/material";
import { UserService } from "../../service/user.service";
import { tap } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { MerchantsDataSource } from "../../service/merchants.data.source";
import { SaveConfirmationDialogComponent } from '../../shared/save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveProgressComponent } from '../../shared/save-progress/save-progress.component';
var UsersAdminComponent = /** @class */ (function () {
    function UsersAdminComponent(snackBar, dialog, route, userService, router) {
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.route = route;
        this.userService = userService;
        this.router = router;
        this.showError = false;
        this.displayedColumns = ["email", "firstName", "lastName", "updatedAt", "status", "remove"];
    }
    UsersAdminComponent.prototype.ngOnInit = function () {
        this.dataSource = new MerchantsDataSource(this.userService);
        this.dataSource.loadMerchants(1, '', 'asc', 0, 5);
    };
    UsersAdminComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(tap(function () { return _this.loadMerchantsPage(); }))
            .subscribe();
    };
    UsersAdminComponent.prototype.loadMerchantsPage = function () {
        this.dataSource.loadMerchants(1, '', this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    };
    UsersAdminComponent.prototype.getStatus = function (status) {
        if (status == 0)
            return "ACCOUNT PENDING";
        else if (status == 1)
            return "ACTIVE";
        else if (status == 2)
            return "NEW PRODUCTS DISABLED";
        else if (status == 3)
            return "ACCOUNT DISABLED";
        else
            return "ACTIVE";
    };
    UsersAdminComponent.prototype.showActivateAccount = function (status) {
        if (status == 0 || status == 2 || status == 3)
            return true;
        return false;
    };
    UsersAdminComponent.prototype.showDisablePrtlAccount = function (status) {
        if (status == 1 || status == 3)
            return true;
        return false;
    };
    UsersAdminComponent.prototype.showDisableAccount = function (status) {
        if (status == 1 || status == 2)
            return true;
        return false;
    };
    UsersAdminComponent.prototype.chageAccountStatus = function (user, status) {
        var _this = this;
        var cnfMsg = "";
        if (status == 1)
            cnfMsg = "Are you sure you want activate this account?";
        else if (status == 2)
            cnfMsg = "Are you sure you want to partially disable this account?";
        else if (status == 3)
            cnfMsg = "Are you sure you want to fully disable this account?";
        var dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
            width: '250px',
            height: '300px',
            data: { title: "", question: cnfMsg }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "yes") {
                var progressDialogRef_1 = _this.dialog.open(SaveProgressComponent, {
                    width: '260px',
                    height: '180px',
                    data: { title: "", question: "" }
                });
                _this.userService.changeUserStatus(user.id, status).subscribe(function (res) {
                    if (res['success']) {
                        progressDialogRef_1.close();
                        var snackBarRef = _this.snackBar.open("You have successfuly changed the account status.", "", {
                            duration: 2000,
                        });
                        snackBarRef.afterDismissed().subscribe(function () {
                            _this.dataSource.loadMerchants(1, '', 'asc', 0, 5);
                        });
                        //this.router.navigate(["../"], { relativeTo: this.route });
                    }
                    else {
                        progressDialogRef_1.close();
                        _this.showError = true;
                        _this.errors = res['messages'];
                    }
                }, function (err) {
                    progressDialogRef_1.close();
                });
            }
        });
    };
    UsersAdminComponent.prototype.close = function () {
        this.showError = false;
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], UsersAdminComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], UsersAdminComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        ViewChild('input'),
        tslib_1.__metadata("design:type", ElementRef)
    ], UsersAdminComponent.prototype, "input", void 0);
    UsersAdminComponent = tslib_1.__decorate([
        Component({
            selector: 'app-users-admin',
            templateUrl: './users-admin.component.html',
            styleUrls: ['./users-admin.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatSnackBar, MatDialog, ActivatedRoute,
            UserService, Router])
    ], UsersAdminComponent);
    return UsersAdminComponent;
}());
export { UsersAdminComponent };
//# sourceMappingURL=users-admin.component.js.map