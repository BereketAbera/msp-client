import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
var SaveProgressComponent = /** @class */ (function () {
    function SaveProgressComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    SaveProgressComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SaveProgressComponent = tslib_1.__decorate([
        Component({
            selector: 'app-save-progress',
            templateUrl: './save-progress.component.html',
            styleUrls: ['./save-progress.component.css']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], SaveProgressComponent);
    return SaveProgressComponent;
}());
export { SaveProgressComponent };
//# sourceMappingURL=save-progress.component.js.map