import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionService } from '../../service/transaction.service';
var RequestConfirmationComponent = /** @class */ (function () {
    function RequestConfirmationComponent(trnsService, dialogRef, data) {
        this.trnsService = trnsService;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    RequestConfirmationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.trnsService.getQRCodeForTransaction(this.data.transactionId).subscribe(function (qrData) {
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
    RequestConfirmationComponent.prototype.isOk = function () {
        console.log("this status " + this.data.status);
        return this.data.status == "OK";
    };
    RequestConfirmationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-request-confirmation',
            templateUrl: './request-confirmation.component.html',
            styleUrls: ['./request-confirmation.component.css']
        }),
        tslib_1.__param(2, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [TransactionService,
            MatDialogRef, Object])
    ], RequestConfirmationComponent);
    return RequestConfirmationComponent;
}());
export { RequestConfirmationComponent };
//# sourceMappingURL=request-confirmation.component.js.map