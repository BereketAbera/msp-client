import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { PaymentTypeDirective } from '../payment-type/payment-type.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { PaymentWithCreditCardComponent } from '../payment-with-credit-card/payment-with-credit-card.component';
import { PaymentWithBalanceComponent } from '../payment-with-balance/payment-with-balance.component';
import { PaymentWithSavedCreditCardComponent } from '../payment-with-saved-credit-card/payment-with-saved-credit-card.component';
var PaymentHomeComponent = /** @class */ (function () {
    function PaymentHomeComponent(cartService, cmpntFctryResolver, router, route) {
        this.cartService = cartService;
        this.cmpntFctryResolver = cmpntFctryResolver;
        this.router = router;
        this.route = route;
        this.productId = 0;
        this.quantity = 0;
        this.tax = 0;
        this.balance = 0;
        this.homeBalance = 0;
        this.payAmount = 0;
        this.total = 0;
        this.savings = 0;
        this.totalMSPMarkup = 0;
        this.PAY_WITH_NEW_CARD = "PAY_WITH_NEW_CREDIT";
        this.PAY_WITH_SAVED_CARD = "PAY_WITH_SAVED_CREDIT";
        this.PAY_WITH_BALANCE = "PAY_WITH_BALANCE";
    }
    PaymentHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCartProduct();
        this.quantity = 1; //+this.route.snapshot.queryParamMap.get('quantity');
        this.productId = 2; //+this.route.snapshot.queryParamMap.get('productId');
        this.route.data
            .subscribe(function (data) {
            //this.product = data.product;
            _this.creditCards = data.creditCards;
            _this.tax = 0; //this.product.shop.tax;
            //this.payAmount = 0;//this.quantity * this.product.discountPrice * (1 + this.tax / 100);
            //this.payAmount = parseFloat((Math.round( this.payAmount * 100 ) / 100).toFixed(2));
            _this.balance = data.balance.amount;
            _this.homeBalance = 1;
            _this.paymentInfo = {
                ordrGuid: _this.cartService.getCartGuid(),
                total: _this.payAmount,
                savings: _this.savings,
                balance: _this.balance,
                savedCreditCard: _this.hasCreditCardInfo,
                creditCards: _this.creditCards
            };
            if (_this.isFundAvailable) {
                _this.loadPaymentWithBalanceComponent();
            }
            else {
                if (_this.hasCreditCardInfo) {
                    _this.loadPaymentWithCreditCardComponent();
                }
                else {
                    _this.loadPaymentWithNewCreditCardComponent();
                }
            }
        });
    };
    PaymentHomeComponent.prototype.getErrorMessage = function () {
    };
    PaymentHomeComponent.prototype.getCartProduct = function () {
        this.cartProducts = this.cartService.getLocalCartProducts();
        this.getTotalPrice();
    };
    PaymentHomeComponent.prototype.getTotalPrice = function () {
        var _this = this;
        if (this.cartProducts.length > 0) {
            this.cartProducts.forEach(function (element) {
                _this.total += element.disPrice * element.qty;
                _this.payAmount += element.disPrice * element.qty * element.mspMarkup / 100;
                _this.savings += (element.regPrice * element.qty) - (element.disPrice * element.qty);
            });
        }
        else {
            this.total = 0;
            this.payAmount = 0;
        }
    };
    PaymentHomeComponent.prototype.loadPaymentWithBalanceComponent = function () {
        var _this = this;
        var componentFactory = this.cmpntFctryResolver.resolveComponentFactory(PaymentWithBalanceComponent);
        var viewContainerRef = this.paymentType.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.data = this.paymentInfo;
        componentRef.instance.payWith.subscribe(function (type) {
            if (type == _this.PAY_WITH_NEW_CARD)
                _this.loadPaymentWithNewCreditCardComponent();
            else if (type == _this.PAY_WITH_SAVED_CARD)
                _this.loadPaymentWithCreditCardComponent();
        });
    };
    PaymentHomeComponent.prototype.loadPaymentWithCreditCardComponent = function () {
        var _this = this;
        var componentFactory = this.cmpntFctryResolver.resolveComponentFactory(PaymentWithSavedCreditCardComponent);
        var viewContainerRef = this.paymentType.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.data = this.paymentInfo;
        componentRef.instance.payWith.subscribe(function (type) {
            if (type == _this.PAY_WITH_NEW_CARD)
                _this.loadPaymentWithNewCreditCardComponent();
            else if (type == _this.PAY_WITH_BALANCE)
                _this.loadPaymentWithBalanceComponent();
        });
    };
    PaymentHomeComponent.prototype.loadPaymentWithNewCreditCardComponent = function () {
        var _this = this;
        var componentFactory = this.cmpntFctryResolver.resolveComponentFactory(PaymentWithCreditCardComponent);
        var viewContainerRef = this.paymentType.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.data = this.paymentInfo;
        componentRef.instance.payWith.subscribe(function (type) {
            if (type == _this.PAY_WITH_SAVED_CARD)
                _this.loadPaymentWithCreditCardComponent();
            else if (type == _this.PAY_WITH_BALANCE)
                _this.loadPaymentWithBalanceComponent();
        });
    };
    PaymentHomeComponent.prototype.getCardType = function (cardNum) {
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
    PaymentHomeComponent.prototype.luhnCheck = function (cardNum) {
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
    Object.defineProperty(PaymentHomeComponent.prototype, "hasCreditCardInfo", {
        get: function () {
            if (this.creditCards && this.creditCards.length > 0)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentHomeComponent.prototype, "isFundAvailable", {
        get: function () {
            if (this.balance >= this.payAmount)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    PaymentHomeComponent.prototype.onSubmit = function () {
    };
    tslib_1.__decorate([
        ViewChild(PaymentTypeDirective),
        tslib_1.__metadata("design:type", PaymentTypeDirective)
    ], PaymentHomeComponent.prototype, "paymentType", void 0);
    PaymentHomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-payment-home',
            templateUrl: './payment-home.component.html',
            styleUrls: ['./payment-home.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [CartService, ComponentFactoryResolver, Router, ActivatedRoute])
    ], PaymentHomeComponent);
    return PaymentHomeComponent;
}());
export { PaymentHomeComponent };
//# sourceMappingURL=payment-home.component.js.map