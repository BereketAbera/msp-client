import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
var CartExpiredDialogComponent = /** @class */ (function () {
    function CartExpiredDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    CartExpiredDialogComponent.prototype.ngOnInit = function () {
    };
    CartExpiredDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    CartExpiredDialogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-cart-expired-dialog',
            templateUrl: './cart-expired-dialog.component.html',
            styleUrls: ['./cart-expired-dialog.component.css']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], CartExpiredDialogComponent);
    return CartExpiredDialogComponent;
}());
export { CartExpiredDialogComponent };
//# sourceMappingURL=cart-expired-dialog.component.js.map