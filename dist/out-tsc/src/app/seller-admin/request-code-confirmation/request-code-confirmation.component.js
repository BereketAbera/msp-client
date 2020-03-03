import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionService } from '../../service/transaction.service';
var RequestCodeConfirmationComponent = /** @class */ (function () {
    function RequestCodeConfirmationComponent(trnsService, dialogRef, data) {
        this.trnsService = trnsService;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    RequestCodeConfirmationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.trnsService.getCdCodeForTransaction(this.data.code).subscribe(function (qrData) {
            if (qrData['success']) {
                _this.data = qrData['data'];
                _this.data.success = true;
            }
            else {
                _this.data = qrData;
                _this.data.success = false;
            }
        });
    };
    RequestCodeConfirmationComponent.prototype.isOk = function () {
        console.log("this status " + this.data.status);
        return this.data.status == "OK";
    };
    RequestCodeConfirmationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-request-code-confirmation',
            templateUrl: './request-code-confirmation.component.html',
            styleUrls: ['./request-code-confirmation.component.scss']
        }),
        tslib_1.__param(2, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [TransactionService,
            MatDialogRef, Object])
    ], RequestCodeConfirmationComponent);
    return RequestCodeConfirmationComponent;
}());
export { RequestCodeConfirmationComponent };
//# sourceMappingURL=request-code-confirmation.component.js.map