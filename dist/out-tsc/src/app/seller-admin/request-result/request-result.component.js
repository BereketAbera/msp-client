import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
var RequestResultComponent = /** @class */ (function () {
    function RequestResultComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    RequestResultComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    RequestResultComponent = tslib_1.__decorate([
        Component({
            selector: 'app-request-result',
            templateUrl: './request-result.component.html',
            styleUrls: ['./request-result.component.scss']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], RequestResultComponent);
    return RequestResultComponent;
}());
export { RequestResultComponent };
//# sourceMappingURL=request-result.component.js.map