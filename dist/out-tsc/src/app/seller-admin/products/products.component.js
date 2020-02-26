import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatSort } from "@angular/material";
import { ProductService } from "../../service/product.service";
import { tap } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { ProductsDataSource } from "../../service/products-data-source.service";
import { AuthService } from '../../service/auth.service';
import { SaveConfirmationDialogComponent } from '../../shared/save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveProgressComponent } from '../../shared/save-progress/save-progress.component';
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(snackBar, dialog, route, productService, router, authService) {
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.route = route;
        this.productService = productService;
        this.router = router;
        this.authService = authService;
        this.showError = false;
        this.displayedColumns = ["name", "shop", "discountPrice", "dispercentage", "remove"];
    }
    ProductsComponent.prototype.ngOnInit = function () {
        this.dataSource = new ProductsDataSource(this.productService);
        this.dataSource.loadProducts(1, '', 'asc', 0, 5);
    };
    ProductsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(tap(function () { return _this.loadProductsPage(); }))
            .subscribe();
    };
    ProductsComponent.prototype.gotoAddNewProduct = function () {
        try {
            var status_1 = this.authService.getMyStatus();
            var userStatus = parseInt(status_1.toString());
            if (userStatus == 1)
                this.router.navigate(["./nwclsngtlgu"], { relativeTo: this.route });
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
    ProductsComponent.prototype.gotoOffPeakProduct = function () {
        try {
            var status_2 = this.authService.getMyStatus();
            var userStatus = parseInt(status_2.toString());
            if (userStatus == 1)
                this.router.navigate(["./nwoffpktlgu"], { relativeTo: this.route });
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
    ProductsComponent.prototype.loadProductsPage = function () {
        this.dataSource.loadProducts(1, '', this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    };
    ProductsComponent.prototype.removeProduct = function (product) {
        var _this = this;
        var dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
            width: '250px',
            height: '300px',
            data: { title: "", question: "\<strong\>Please note:\<\/strong\> Some buyers might be placing orders on the product being deleted. You might still get orders after deletion.\n Do you want to remove the product?" }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "yes") {
                var progressDialogRef_1 = _this.dialog.open(SaveProgressComponent, {
                    width: '260px',
                    height: '180px',
                    data: { title: "", question: "" }
                });
                _this.productService.removeProduct(product.id).subscribe(function (res) {
                    if (res['success']) {
                        progressDialogRef_1.close();
                        var snackBarRef = _this.snackBar.open("Successfuly Removed", "", {
                            duration: 2000,
                        });
                        snackBarRef.afterDismissed().subscribe(function () {
                            _this.dataSource.loadProducts(1, '', 'asc', 0, 5);
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
    ProductsComponent.prototype.close = function () {
        this.showError = false;
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], ProductsComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], ProductsComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        ViewChild('input'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ProductsComponent.prototype, "input", void 0);
    ProductsComponent = tslib_1.__decorate([
        Component({
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [MatSnackBar, MatDialog, ActivatedRoute,
            ProductService, Router, AuthService])
    ], ProductsComponent);
    return ProductsComponent;
}());
export { ProductsComponent };
//# sourceMappingURL=products.component.js.map