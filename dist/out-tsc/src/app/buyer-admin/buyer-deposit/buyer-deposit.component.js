import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { PaymentTypeDirective } from '../payment-type/payment-type.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { DepositeWithNewCreditCardComponent } from '../deposite-with-new-credit-card/deposite-with-new-credit-card.component';
import { DepositeWithSavedCreditCardComponent } from '../deposite-with-saved-credit-card/deposite-with-saved-credit-card.component';
var BuyerDepositComponent = /** @class */ (function () {
    function BuyerDepositComponent(cmpntFctryResolver, router, route) {
        this.cmpntFctryResolver = cmpntFctryResolver;
        this.router = router;
        this.route = route;
        this.balance = 0;
        this.PAY_WITH_NEW_CARD = "PAY_WITH_NEW_CREDIT";
        this.PAY_WITH_SAVED_CARD = "PAY_WITH_SAVED_CREDIT";
    }
    BuyerDepositComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.creditCards = data.creditCards;
            _this.balance = data.balance.amount;
            _this.paymentInfo = {
                ordrGuid: "",
                total: 0,
                balance: 0,
                savings: 0,
                savedCreditCard: _this.hasCreditCardInfo,
                creditCards: _this.creditCards
            };
            if (_this.hasCreditCardInfo) {
                _this.loadPaymentWithCreditCardComponent();
            }
            else {
                _this.loadPaymentWithNewCreditCardComponent();
            }
        });
    };
    BuyerDepositComponent.prototype.getErrorMessage = function () {
    };
    BuyerDepositComponent.prototype.loadPaymentWithCreditCardComponent = function () {
        var _this = this;
        var componentFactory = this.cmpntFctryResolver.resolveComponentFactory(DepositeWithSavedCreditCardComponent);
        var viewContainerRef = this.paymentType.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.data = this.paymentInfo;
        componentRef.instance.payWith.subscribe(function (type) {
            _this.loadPaymentWithNewCreditCardComponent();
        });
    };
    BuyerDepositComponent.prototype.loadPaymentWithNewCreditCardComponent = function () {
        var componentFactory = this.cmpntFctryResolver.resolveComponentFactory(DepositeWithNewCreditCardComponent);
        var viewContainerRef = this.paymentType.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
    };
    BuyerDepositComponent.prototype.getCardType = function (cardNum) {
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
    BuyerDepositComponent.prototype.luhnCheck = function (cardNum) {
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
    Object.defineProperty(BuyerDepositComponent.prototype, "hasCreditCardInfo", {
        get: function () {
            if (this.creditCards && this.creditCards.length > 0)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    BuyerDepositComponent.prototype.onSubmit = function () {
    };
    tslib_1.__decorate([
        ViewChild(PaymentTypeDirective),
        tslib_1.__metadata("design:type", PaymentTypeDirective)
    ], BuyerDepositComponent.prototype, "paymentType", void 0);
    BuyerDepositComponent = tslib_1.__decorate([
        Component({
            selector: 'app-buyer-deposit',
            templateUrl: './buyer-deposit.component.html',
            styleUrls: ['./buyer-deposit.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ComponentFactoryResolver, Router, ActivatedRoute])
    ], BuyerDepositComponent);
    return BuyerDepositComponent;
}());
export { BuyerDepositComponent };
//# sourceMappingURL=buyer-deposit.component.js.map