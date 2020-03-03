import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
var SaveConfirmationDialogComponent = /** @class */ (function () {
    function SaveConfirmationDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    SaveConfirmationDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SaveConfirmationDialogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-save-confirmation-dialog',
            templateUrl: './save-confirmation-dialog.component.html',
            styleUrls: ['./save-confirmation-dialog.component.scss']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], SaveConfirmationDialogComponent);
    return SaveConfirmationDialogComponent;
}());
export { SaveConfirmationDialogComponent };
//# sourceMappingURL=save-confirmation-dialog.component.js.map