import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../service/transaction.service';
import { SaveConfirmationDialogComponent } from '../../shared/save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveProgressComponent } from '../../shared/save-progress/save-progress.component';
var BuyerItemQrcodeComponent = /** @class */ (function () {
    function BuyerItemQrcodeComponent(router, snackBar, dialog, route, trnsService) {
        this.router = router;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.route = route;
        this.trnsService = trnsService;
        this.showError = false;
        this.code = "xxx-xxx";
    }
    BuyerItemQrcodeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.route.data
            .subscribe(function (data) {
            _this.transaction = data.transaction;
            if (_this.transaction.codePool && _this.transaction.codePool.code && _this.transaction.codePool.code.length == 6)
                _this.code = _this.transaction.codePool.code.slice(0, 3) + "-" + _this.transaction.codePool.code.slice(3, 6);
            _this.supplier = data.supplier;
            _this.transStatus = data.transStatus;
        });
        /* this.trnsService.getQRCode(id).subscribe(image => {
          this.image.nativeElement.src = URL.createObjectURL(image)
        }); */
    };
    BuyerItemQrcodeComponent.prototype.acceptProduct = function () {
        var _this = this;
        this.trnsService.getTransactionStatus(this.transaction.id).subscribe(function (latestTrnsStatus) {
            if ((latestTrnsStatus.status == "OK" && latestTrnsStatus.isScanneded) || (latestTrnsStatus.status == "REJECTED" && latestTrnsStatus.isScanneded && latestTrnsStatus.canBeAccepted)) {
                _this.acceptOrder(true);
            }
            else if (latestTrnsStatus.status == "OK" && !latestTrnsStatus.isScanneded) {
                alert("your QR Code is not scaned yet. Please ask the seller to scan your QR Code.");
            }
            else {
                alert("Sorry, this QR Code is already claimed,rejected or expired.");
            }
        });
    };
    BuyerItemQrcodeComponent.prototype.rejectProduct = function () {
        var _this = this;
        this.trnsService.getTransactionStatus(this.transaction.id).subscribe(function (latestTrnsStatus) {
            if (latestTrnsStatus.status == "OK" && latestTrnsStatus.isScanneded) {
                _this.acceptOrder(false);
            }
            else if (latestTrnsStatus.status == "OK" && !latestTrnsStatus.isScanneded) {
                alert("your QR Code is not scaned yet. Please ask the seller to scan your QR Code.");
            }
            else {
                alert("Sorry, this QR Code is already claimed,rejected or expired.");
            }
        });
    };
    BuyerItemQrcodeComponent.prototype.showIfRejected = function () {
        if (this.transStatus.status == "REJECTED")
            return true;
        return false;
    };
    BuyerItemQrcodeComponent.prototype.showAcceptReject = function () {
        if (this.transStatus.status == "OK" || (this.transStatus.status == "REJECTED" && this.transStatus.isScanneded && this.transStatus.canBeAccepted))
            return true;
        return false;
    };
    BuyerItemQrcodeComponent.prototype.showReject = function () {
        if (this.transStatus.status == "OK")
            return true;
        return false;
    };
    BuyerItemQrcodeComponent.prototype.showAccept = function () {
        if (this.transStatus.status == "OK" || (this.transStatus.status == "REJECTED" && this.transStatus.isScanneded && this.transStatus.canBeAccepted))
            return true;
        return false;
    };
    BuyerItemQrcodeComponent.prototype.showClaimedDate = function () {
        if (this.transStatus.status == "CLAIMED" || this.transStatus.status == "REJECTED")
            return true;
        return false;
    };
    Object.defineProperty(BuyerItemQrcodeComponent.prototype, "ORDERSTATUS", {
        get: function () {
            if (this.transStatus.status == "REJECTED")
                return "Rejected";
            else if (this.transStatus.status == "EXPIRED")
                return "Expired";
            else if (this.transStatus.status == "CLAIMED")
                return "Picked Up";
            else
                return "Pending";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuyerItemQrcodeComponent.prototype, "CLAIMMSG", {
        get: function () {
            if (this.transStatus.status == "REJECTED")
                return "Rejected at";
            return "Picked at";
        },
        enumerable: true,
        configurable: true
    });
    BuyerItemQrcodeComponent.prototype.acceptOrder = function (isOK) {
        var _this = this;
        var qt = "";
        var ordMsg = "";
        if (isOK) {
            qt = "you have agreed to accept this order.";
            ordMsg = "Thanks, you have succefuly accepted the order";
        }
        else {
            ordMsg = "Thanks, you have succefuly rejected the order";
            qt = "do you want to reject this product?";
        }
        var dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
            width: '250px',
            height: '150px',
            data: { title: "", question: qt }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "yes") {
                var progressDialogRef_1 = _this.dialog.open(SaveProgressComponent, {
                    width: '260px',
                    height: '180px',
                    data: { title: "", question: "" }
                });
                _this.trnsService.acceptOrder(isOK, _this.transaction.id).subscribe(function (res) {
                    if (res['success']) {
                        progressDialogRef_1.close();
                        var snackBarRef = _this.snackBar.open(ordMsg, "", {
                            duration: 2000,
                        });
                        snackBarRef.afterDismissed().subscribe(function () {
                            _this.router.navigate(["../../"], { relativeTo: _this.route });
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
    BuyerItemQrcodeComponent.prototype.close = function () {
        this.showError = false;
    };
    tslib_1.__decorate([
        ViewChild("qrImg"),
        tslib_1.__metadata("design:type", Object)
    ], BuyerItemQrcodeComponent.prototype, "image", void 0);
    BuyerItemQrcodeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-buyer-item-qrcode',
            templateUrl: './buyer-item-qrcode.component.html',
            styleUrls: ['./buyer-item-qrcode.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, MatSnackBar, MatDialog, ActivatedRoute, TransactionService])
    ], BuyerItemQrcodeComponent);
    return BuyerItemQrcodeComponent;
}());
export { BuyerItemQrcodeComponent };
//# sourceMappingURL=buyer-item-qrcode.component.js.map