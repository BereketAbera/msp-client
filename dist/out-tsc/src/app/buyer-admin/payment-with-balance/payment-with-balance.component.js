import * as tslib_1 from "tslib";
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../service/cart.service';
import { TransactionService } from '../../service/transaction.service';
import { CartExpiredDialogComponent } from '../../components/cart-expired-dialog/cart-expired-dialog.component';
var PaymentWithBalanceComponent = /** @class */ (function () {
    function PaymentWithBalanceComponent(dialog, cartService, trnsService, fb, router, route) {
        this.dialog = dialog;
        this.cartService = cartService;
        this.trnsService = trnsService;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.payWith = new EventEmitter();
        this.showError = false;
        this.errors = [];
        this.PAY_WITH_NEW_CARD = "PAY_WITH_NEW_CREDIT";
        this.PAY_WITH_SAVED_CARD = "PAY_WITH_SAVED_CREDIT";
        this.PAY_WITH_BALANCE = "PAY_WITH_BALANCE";
        this.creditInfoAvailable = false;
        this.quantity = 0;
        this.balance = 0;
        this.orderAmount = 0;
        this.paymentForm = this.fb.group({
            deposit: ["", Validators.required],
            paymentType: [this.PAY_WITH_BALANCE, Validators.required]
        });
    }
    PaymentWithBalanceComponent.prototype.ngOnInit = function () {
        this.ordrGuid = this.data.ordrGuid;
        this.balance = this.data.balance;
        this.orderAmount = +this.data.total.toFixed(2);
        this.creditInfoAvailable = this.data.savedCreditCard;
        this.minimumAmount = (this.orderAmount - this.balance).toFixed(2);
        //this.paymentForm.get('deposit').setValue(this.minimumAmount.toFixed(2));
    };
    PaymentWithBalanceComponent.prototype.payWithCredit = function () {
        if (this.creditInfoAvailable)
            this.payWith.emit(this.PAY_WITH_SAVED_CARD);
        else
            this.payWith.emit(this.PAY_WITH_NEW_CARD);
    };
    PaymentWithBalanceComponent.prototype.payWithSavedCredit = function () {
        this.payWith.emit(this.PAY_WITH_SAVED_CARD);
    };
    PaymentWithBalanceComponent.prototype.goToHome = function () {
        this.router.navigate(['/']);
    };
    PaymentWithBalanceComponent.prototype.close = function () {
        this.showError = false;
    };
    PaymentWithBalanceComponent.prototype.showResetDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(CartExpiredDialogComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.cartService.resetCart();
            _this.router.navigate(['../']);
        });
    };
    PaymentWithBalanceComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.cartService.isCartExpired()) {
            this.showResetDialog();
        }
        else {
            var transction = this.paymentForm.value;
            transction.ordrGuid = this.ordrGuid;
            //transction.quantity = this.quantity;
            this.trnsService.createTransaction(transction).subscribe(function (res) {
                if (res['success']) {
                    _this.cartService.resetCart();
                    _this.router.navigate(["../../"], { relativeTo: _this.route });
                }
                else {
                    _this.showError = true;
                    _this.errors = res['messages'];
                }
            });
        }
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PaymentWithBalanceComponent.prototype, "payWith", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PaymentWithBalanceComponent.prototype, "data", void 0);
    PaymentWithBalanceComponent = tslib_1.__decorate([
        Component({
            selector: 'app-payment-with-balance',
            templateUrl: './payment-with-balance.component.html',
            styleUrls: ['./payment-with-balance.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog, CartService, TransactionService, FormBuilder, Router, ActivatedRoute])
    ], PaymentWithBalanceComponent);
    return PaymentWithBalanceComponent;
}());
export { PaymentWithBalanceComponent };
//# sourceMappingURL=payment-with-balance.component.js.map