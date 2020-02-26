import * as tslib_1 from "tslib";
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
var PaymentWithSavedCreditCardComponent = /** @class */ (function () {
    function PaymentWithSavedCreditCardComponent(fb, trnsService, router, route) {
        this.fb = fb;
        this.trnsService = trnsService;
        this.router = router;
        this.route = route;
        this.payWith = new EventEmitter();
        this.showError = false;
        this.errors = [];
        this.PAY_WITH_NEW_CARD = "PAY_WITH_NEW_CREDIT";
        this.PAY_WITH_SAVED_CARD = "PAY_WITH_SAVED_CREDIT";
        this.PAY_WITH_BALANCE = "PAY_WITH_BALANCE";
        this.balance = 0;
        this.orderAmount = 0;
        this.paymentForm = this.fb.group({
            paymentInfoId: ['', Validators.required],
            cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
            deposit: ["", Validators.required],
            paymentType: [this.PAY_WITH_SAVED_CARD, Validators.required]
        });
    }
    PaymentWithSavedCreditCardComponent.prototype.ngOnInit = function () {
        this.ordrGuid = this.data.ordrGuid;
        this.balance = this.data.balance;
        this.orderAmount = this.data.total;
        this.paymentForm.get('paymentInfoId').setValue(this.data.creditCards[0].id);
        if (this.orderAmount > this.balance)
            this.minimumAmount = this.orderAmount - this.balance;
        else
            this.minimumAmount = this.orderAmount;
        this.minimumAmount = +this.minimumAmount.toFixed(2);
        this.paymentForm.get('deposit').setValue(this.minimumAmount.toFixed(2));
    };
    Object.defineProperty(PaymentWithSavedCreditCardComponent.prototype, "isFundAvailable", {
        get: function () {
            if (this.balance >= this.orderAmount)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    PaymentWithSavedCreditCardComponent.prototype.payWithBalance = function () {
        this.payWith.emit(this.PAY_WITH_BALANCE);
    };
    PaymentWithSavedCreditCardComponent.prototype.payWithNewCredit = function () {
        this.payWith.emit(this.PAY_WITH_NEW_CARD);
    };
    PaymentWithSavedCreditCardComponent.prototype.goToHome = function () {
        this.router.navigate(['/']);
    };
    PaymentWithSavedCreditCardComponent.prototype.goToDeposit = function () {
        this.router.navigate(['../../deposit'], { relativeTo: this.route });
    };
    PaymentWithSavedCreditCardComponent.prototype.close = function () {
        this.showError = false;
    };
    PaymentWithSavedCreditCardComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.paymentForm.get('cvc') && (this.paymentForm.get('cvc').value.length >= 3 && this.paymentForm.get('cvc').value.length <= 4)) {
            var transction = this.paymentForm.value;
            transction.ordrGuid = this.ordrGuid;
            this.trnsService.createTransaction(transction).subscribe(function (res) {
                if (res['success']) {
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
    ], PaymentWithSavedCreditCardComponent.prototype, "payWith", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PaymentWithSavedCreditCardComponent.prototype, "data", void 0);
    PaymentWithSavedCreditCardComponent = tslib_1.__decorate([
        Component({
            selector: 'app-payment-with-saved-credit-card',
            templateUrl: './payment-with-saved-credit-card.component.html',
            styleUrls: ['./payment-with-saved-credit-card.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, TransactionService, Router, ActivatedRoute])
    ], PaymentWithSavedCreditCardComponent);
    return PaymentWithSavedCreditCardComponent;
}());
export { PaymentWithSavedCreditCardComponent };
//# sourceMappingURL=payment-with-saved-credit-card.component.js.map