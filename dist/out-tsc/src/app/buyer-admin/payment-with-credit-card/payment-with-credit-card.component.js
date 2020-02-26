import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { ZipcodeService } from '../../service/zipcode.service';
import { CreditCardValidator } from 'angular-cc-library';
import { DataStorageService } from '../../service/data-storage.service';
import { TransactionService } from '../../service/transaction.service';
var PaymentWithCreditCardComponent = /** @class */ (function () {
    function PaymentWithCreditCardComponent(trnsService, dsService, fb, zipCodeService, router, route) {
        this.trnsService = trnsService;
        this.dsService = dsService;
        this.fb = fb;
        this.zipCodeService = zipCodeService;
        this.router = router;
        this.route = route;
        this.payWith = new EventEmitter();
        this.PAY_WITH_NEW_CARD = "PAY_WITH_NEW_CREDIT";
        this.PAY_WITH_SAVED_CARD = "PAY_WITH_SAVED_CREDIT";
        this.PAY_WITH_BALANCE = "PAY_WITH_BALANCE";
        this.showError = false;
        this.errors = [];
        this.tax = 0;
        this.balance = 0;
        this.minimumAmount = 0;
        this.orderAmount = 0;
        this.hasCreditCardInfo = false;
        this.zipCodeHints$ = new Observable();
        this.creditInfoAvailable = false;
        this.paymentForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
            creditCard: ['', [CreditCardValidator.validateCCNumber]],
            expirationDate: ['', [CreditCardValidator.validateExpDate]],
            cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
            rememberCrdt: false,
            deposit: ["", Validators.required],
            paymentType: [this.PAY_WITH_NEW_CARD, Validators.required]
        });
    }
    PaymentWithCreditCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ordrGuid = this.data.ordrGuid;
        this.balance = this.data.balance;
        this.orderAmount = this.data.total;
        this.creditInfoAvailable = this.data.savedCreditCard;
        if (this.orderAmount > this.balance)
            this.minimumAmount = this.orderAmount - this.balance;
        else
            this.minimumAmount = this.orderAmount;
        this.minimumAmount = +this.minimumAmount.toFixed(2);
        this.paymentForm.get('deposit').setValue(this.minimumAmount.toFixed(2));
        this.zipCodeHints$ = this.paymentForm.get('zipCode').valueChanges.pipe(debounceTime(500), filter(function (txt) {
            if (!txt || txt == "")
                return false;
            return txt.toString().length > 3;
        }), distinctUntilChanged(), switchMap(function (searchTXT) {
            return _this.zipCodeService.listZipcods(searchTXT);
        }));
    };
    PaymentWithCreditCardComponent.prototype.getErrorMessage = function () {
    };
    PaymentWithCreditCardComponent.prototype.getCardType = function (cardNum) {
        if (!this.luhnCheck(cardNum)) {
            return "";
        }
        var payCardType = "";
        var regexMap = [
            { regEx: /^4[0-9]{5}/ig, cardType: "VISA" },
            { regEx: /^5[1-5][0-9]{4}/ig, cardType: "MASTERCARD" },
            { regEx: /^3[47][0-9]{3}/ig, cardType: "AMEX" },
            { regEx: /^(5[06-8]\d{4}|6\d{5})/ig, cardType: "MAESTRO" }
        ];
        for (var j = 0; j < regexMap.length; j++) {
            if (cardNum.match(regexMap[j].regEx)) {
                payCardType = regexMap[j].cardType;
                break;
            }
        }
        if (cardNum.indexOf("50") === 0 || cardNum.indexOf("60") === 0 || cardNum.indexOf("65") === 0) {
            var g = "508500-508999|606985-607984|608001-608500|652150-653149";
            var i = g.split("|");
            for (var d = 0; d < i.length; d++) {
                var c = parseInt(i[d].split("-")[0], 10);
                var f = parseInt(i[d].split("-")[1], 10);
                if ((cardNum.substr(0, 6) >= c && cardNum.substr(0, 6) <= f) && cardNum.length >= 6) {
                    payCardType = "RUPAY";
                    break;
                }
            }
        }
        return payCardType;
    };
    PaymentWithCreditCardComponent.prototype.luhnCheck = function (cardNum) {
        // Luhn Check Code from https://gist.github.com/4075533
        // accept only digits, dashes or spaces
        var numericDashRegex = /^[\d\-\s]+$/;
        if (!numericDashRegex.test(cardNum))
            return false;
        // The Luhn Algorithm. It's so pretty.
        var nCheck = 0, nDigit = 0, bEven = false;
        var strippedField = cardNum.replace(/\D/g, "");
        for (var n = strippedField.length - 1; n >= 0; n--) {
            var cDigit = strippedField.charAt(n);
            nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9)
                    nDigit -= 9;
            }
            nCheck += nDigit;
            bEven = !bEven;
        }
        return (nCheck % 10) === 0;
    };
    PaymentWithCreditCardComponent.prototype.payWithBalance = function () {
        this.payWith.emit(this.PAY_WITH_BALANCE);
    };
    PaymentWithCreditCardComponent.prototype.payWithSavedCredit = function () {
        this.payWith.emit(this.PAY_WITH_SAVED_CARD);
    };
    PaymentWithCreditCardComponent.prototype.goToHome = function () {
        this.router.navigate(['/']);
    };
    PaymentWithCreditCardComponent.prototype.goToDeposit = function () {
        this.router.navigate(['../../deposit'], { relativeTo: this.route });
    };
    PaymentWithCreditCardComponent.prototype.onSubmit = function () {
        var _this = this;
        var transction = this.paymentForm.value;
        transction.ordrGuid = this.ordrGuid;
        transction.cardType = this.getCardType(transction.creditCard);
        this.trnsService.createTransaction(transction).subscribe(function (res) {
            if (res['success']) {
                _this.router.navigate(["../../"], { relativeTo: _this.route });
            }
            else {
                _this.showError = true;
                _this.errors = res['messages'];
            }
        });
    };
    Object.defineProperty(PaymentWithCreditCardComponent.prototype, "isFundAvailable", {
        get: function () {
            if (this.balance >= this.orderAmount)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    PaymentWithCreditCardComponent.prototype.close = function () {
        this.showError = false;
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], PaymentWithCreditCardComponent.prototype, "payWith", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PaymentWithCreditCardComponent.prototype, "data", void 0);
    PaymentWithCreditCardComponent = tslib_1.__decorate([
        Component({
            selector: 'payment-with-credit-card',
            templateUrl: './payment-with-credit-card.component.html',
            styleUrls: ['./payment-with-credit-card.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [TransactionService, DataStorageService, FormBuilder, ZipcodeService, Router, ActivatedRoute])
    ], PaymentWithCreditCardComponent);
    return PaymentWithCreditCardComponent;
}());
export { PaymentWithCreditCardComponent };
//# sourceMappingURL=payment-with-credit-card.component.js.map