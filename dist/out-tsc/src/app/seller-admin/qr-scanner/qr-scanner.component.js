import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { RequestResultComponent } from '../request-result/request-result.component';
import { RequestConfirmationComponent } from '../request-confirmation/request-confirmation.component';
import { RequestCodeConfirmationComponent } from '../request-code-confirmation/request-code-confirmation.component';
import jsQR from 'jsqr';
import { TransactionService } from '../../service/transaction.service';
import { AuthService } from '../../service/auth.service';
var QrScannerComponent = /** @class */ (function () {
    function QrScannerComponent(authService, dialog, transactionService) {
        this.authService = authService;
        this.dialog = dialog;
        this.transactionService = transactionService;
        this.isScanning = false;
        this.displayChk = "none";
        this.disInvalidPrdct = "none";
        this.displayScanner = "block";
        this.transactionId = 0;
        this.showError = false;
        this.errMsg = "";
        this.errors = [];
        this.code = new FormControl('');
    }
    QrScannerComponent.prototype.ngOnInit = function () {
        if (!this.authService.accountCanScan())
            this.showError = true;
    };
    QrScannerComponent.prototype.showResult = function (msg) {
        var dialogRef = this.dialog.open(RequestResultComponent, {
            width: '250px',
            height: '300px',
            data: { title: "Status", question: msg }
        });
    };
    QrScannerComponent.prototype.openConfirmation = function (qrData) {
    };
    QrScannerComponent.prototype.close = function () {
        this.showError = false;
        this.displayScanner = "block";
    };
    QrScannerComponent.prototype.startScanner = function () {
        var _this = this;
        this.video.play();
        this.isScanning = true;
        setTimeout(requestAnimationFrame, 100, function () { return _this.tick(); });
    };
    QrScannerComponent.prototype.checkOrderStatus = function () {
        var _this = this;
        var msg = "";
        this.transactionService.getOrderSeller(this.transactionId).subscribe(function (transaction) {
            if (transaction.status == 1) {
                _this.showResult("You can now give the product to the buyer.");
            }
            else if (transaction.status == 2) {
                _this.showResult("The buyer has rejected the product.\n You will not get paid. Try to resolve the problem and ask the Buyer to press Accept Product Button before he leaves.");
            }
            else {
                _this.showResult("The buyer has not pressed Accept or Reject button on his phone yet.\n Do not release product unless you receive an Acceptance status.");
            }
        });
    };
    QrScannerComponent.prototype.stopScanner = function () {
        this.video.pause();
        this.isScanning = false;
    };
    QrScannerComponent.prototype.drawLine = function (begin, end, color) {
        this.canvas.beginPath();
        this.canvas.moveTo(begin.x, begin.y);
        this.canvas.lineTo(end.x, end.y);
        this.canvas.lineWidth = 4;
        this.canvas.strokeStyle = color;
        this.canvas.stroke();
    };
    // Use facingMode: environment to attemt to get the front camera on phones
    QrScannerComponent.prototype.checkCode = function () {
        var _this = this;
        //this.stopScanner()
        var ordCode = this.code.value.first + this.code.value.second;
        var dialogRef = this.dialog.open(RequestCodeConfirmationComponent, { data: { code: ordCode } });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                //this.isScanning = false;
                //this.video.pause();
                _this.transactionService.processTransactionQRCdCode({ code: ordCode, qrCode: result.qrCode }).subscribe(function (result) {
                    if (result['success']) {
                        _this.transactionId = result['transactionId'];
                        _this.displayChk = "block";
                        _this.displayScanner = "none";
                        //console.log("You can now give the item to the buyer.");
                    }
                    else {
                        _this.showError = true;
                        _this.errors = result['messages'];
                        _this.displayScanner = "none";
                    }
                });
            }
        });
    };
    QrScannerComponent.prototype.accountCanScan = function () {
        return this.authService.accountCanScan();
    };
    QrScannerComponent.prototype.tick = function () {
        var _this = this;
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            //this.canvasElement.height = this.video.videoHeight;
            //this.canvasElement.width = this.video.videoWidth;
            this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
            var imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
            var code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
                this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
                this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
                this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
                this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
                //outputData.parentElement.hidden = false;
                //outputData.innerText = code.data;
                try {
                    var cstInfo = JSON.parse(code.data);
                    if (cstInfo) {
                        this.transactionId = cstInfo.transactionId;
                        this.isScanning = false;
                        var dialogRef = this.dialog.open(RequestConfirmationComponent, { data: cstInfo });
                        dialogRef.afterClosed().subscribe(function (result) {
                            if (result) {
                                _this.isScanning = false;
                                _this.video.pause();
                                _this.transactionService.processTransactionQRCode(cstInfo).subscribe(function (result) {
                                    if (result['success']) {
                                        _this.displayChk = "block";
                                        _this.displayScanner = "none";
                                        console.log("You can now give the item to the buyer.");
                                    }
                                    else {
                                        _this.showError = true;
                                        _this.errors = result['messages'];
                                        _this.displayScanner = "none";
                                    }
                                });
                            }
                            else {
                                if (_this.isScanning)
                                    requestAnimationFrame(function () { return _this.tick(); });
                            }
                        });
                    }
                    else {
                        alert("Not a valid customer!!!1");
                        this.isScanning = false;
                    }
                }
                catch (err) {
                    alert("Not a valid customer!!!2");
                    this.isScanning = false;
                }
            }
            else {
                if (this.isScanning)
                    requestAnimationFrame(function () { return _this.tick(); });
            }
        }
    };
    tslib_1.__decorate([
        ViewChild('canvasElementHTML'),
        tslib_1.__metadata("design:type", Object)
    ], QrScannerComponent.prototype, "canvasElementHTML", void 0);
    QrScannerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-qr-scanner',
            templateUrl: './qr-scanner.component.html',
            styleUrls: ['./qr-scanner.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, MatDialog, TransactionService])
    ], QrScannerComponent);
    return QrScannerComponent;
}());
export { QrScannerComponent };
//# sourceMappingURL=qr-scanner.component.js.map