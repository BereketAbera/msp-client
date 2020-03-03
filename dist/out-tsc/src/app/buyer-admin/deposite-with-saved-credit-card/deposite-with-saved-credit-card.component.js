import * as tslib_1 from "tslib";
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { debounceTime } from 'rxjs/operators';
var DepositeWithSavedCreditCardComponent = /** @class */ (function () {
    function DepositeWithSavedCreditCardComponent(fb, trnsService, router, route) {
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
        this.minimumAmount = 10;
        this.balance = 0;
        this.paymentForm = this.fb.group({
            paymentInfoId: ['', Validators.required],
            cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
            deposit: ["10.00", [Validators.required, Validators.min(10)]],
            paymentType: [this.PAY_WITH_SAVED_CARD, Validators.required]
        });
    }
    DepositeWithSavedCreditCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paymentForm.get('deposit').valueChanges.pipe(debounceTime(1000))
            .subscribe(function (inpValue) {
            if (inpValue) {
                if (/^\d+$/.test(inpValue.toString()) && !inpValue.toString().includes('.'))
                    _this.paymentForm.get('deposit').setValue(inpValue + ".00");
            }
        });
        this.paymentForm.get('paymentInfoId').setValue(this.data.creditCards[0].id);
    };
    DepositeWithSavedCreditCardComponent.prototype.payWithBalance = function () {
        this.payWith.emit(this.PAY_WITH_BALANCE);
    };
    DepositeWithSavedCreditCardComponent.prototype.payWithNewCredit = function () {
        this.payWith.emit(this.PAY_WITH_NEW_CARD);
    };
    DepositeWithSavedCreditCardComponent.prototype.goToHome = function () {
        this.router.navigate(['/']);
    };
    DepositeWithSavedCreditCardComponent.prototype.close = function () {
        this.showError = false;
    };
    DepositeWithSavedCreditCardComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.paymentForm.get('cvc') && (this.paymentForm.get('cvc').value.length >= 3 && this.paymentForm.get('cvc').value.length <= 4)) {
            var depositAmnt = this.paymentForm.get('deposit').value;
            if (!isNaN(depositAmnt) && parseFloat(depositAmnt) >= 10) {
                var transction = this.paymentForm.value;
                this.trnsService.createDeposit(transction).subscribe(function (res) {
                    if (res['success']) {
                        _this.router.navigate(["../trnsctns"], { relativeTo: _this.route });
                    }
                    else {
                        _this.showError = true;
                        _this.errors = res['messages'];
                    }
                });
            }
            else {
                alert("invalid deposit amount");
            }
        }
        else {
            alert("invalid cvc");
        }
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], DepositeWithSavedCreditCardComponent.prototype, "payWith", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], DepositeWithSavedCreditCardComponent.prototype, "data", void 0);
    DepositeWithSavedCreditCardComponent = tslib_1.__decorate([
        Component({
            selector: 'app-deposite-with-saved-credit-card',
            templateUrl: './deposite-with-saved-credit-card.component.html',
            styleUrls: ['./deposite-with-saved-credit-card.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, TransactionService, Router, ActivatedRoute])
    ], DepositeWithSavedCreditCardComponent);
    return DepositeWithSavedCreditCardComponent;
}());
export { DepositeWithSavedCreditCardComponent };
//# sourceMappingURL=deposite-with-saved-credit-card.component.js.map