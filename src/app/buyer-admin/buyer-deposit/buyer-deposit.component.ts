import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
} from "@angular/core";
import { PaymentTypeDirective } from "../payment-type/payment-type.directive";
import { Router, ActivatedRoute } from "@angular/router";
import { Balance } from "../../model/balance";
import { CreditCard } from "../../model/creditCard";
import { PaymentInfo } from "../../model/paymentInfo";

import { DepositeWithNewCreditCardComponent } from "../deposite-with-new-credit-card/deposite-with-new-credit-card.component";
import { DepositeWithSavedCreditCardComponent } from "../deposite-with-saved-credit-card/deposite-with-saved-credit-card.component";

@Component({
  selector: "app-buyer-deposit",
  templateUrl: "./buyer-deposit.component.html",
  styleUrls: ["./buyer-deposit.component.scss"],
})
export class BuyerDepositComponent implements OnInit {
  @ViewChild(PaymentTypeDirective) paymentType: PaymentTypeDirective;

  creditCards: CreditCard[];
  balance: number = 0;
  paymentInfo: PaymentInfo;

  PAY_WITH_NEW_CARD: string = "PAY_WITH_NEW_CREDIT";
  PAY_WITH_SAVED_CARD: string = "PAY_WITH_SAVED_CREDIT";

  constructor(
    private cmpntFctryResolver: ComponentFactoryResolver,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: { balance: Balance; creditCards: CreditCard[] }) => {
        this.creditCards = data.creditCards;

        this.balance = data.balance.amount;
        this.paymentInfo = {
          ordrGuid: "",
          total: 0,
          balance: 0,
          savings: 0,
          savedCreditCard: this.hasCreditCardInfo,
          creditCards: this.creditCards,
        };

        if (this.hasCreditCardInfo) {
          this.loadPaymentWithCreditCardComponent();
        } else {
          this.loadPaymentWithNewCreditCardComponent();
        }
      }
    );
  }
  getErrorMessage() {}

  loadPaymentWithCreditCardComponent() {
    let componentFactory = this.cmpntFctryResolver.resolveComponentFactory(
      DepositeWithSavedCreditCardComponent
    );

    let viewContainerRef = this.paymentType.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<DepositeWithSavedCreditCardComponent>(
      componentRef.instance
    )).data = this.paymentInfo;
    (<DepositeWithSavedCreditCardComponent>(
      componentRef.instance
    )).payWith.subscribe((type) => {
      this.loadPaymentWithNewCreditCardComponent();
    });
  }
  loadPaymentWithNewCreditCardComponent() {
    let componentFactory = this.cmpntFctryResolver.resolveComponentFactory(
      DepositeWithNewCreditCardComponent
    );

    let viewContainerRef = this.paymentType.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
  }
  getCardType(cardNum) {
    if (!this.luhnCheck(cardNum)) {
      return "";
    }
    var payCardType = "";
    var regexMap = [
      { regEx: /^4[0-9]{5}/gi, cardType: "VISA" },
      { regEx: /^5[1-5][0-9]{4}/gi, cardType: "MASTERCARD" },
      { regEx: /^3[47][0-9]{3}/gi, cardType: "AMEX" },
      { regEx: /^(5[06-8]\d{4}|6\d{5})/gi, cardType: "MAESTRO" },
    ];

    for (var j = 0; j < regexMap.length; j++) {
      if (cardNum.match(regexMap[j].regEx)) {
        payCardType = regexMap[j].cardType;
        break;
      }
    }

    if (
      cardNum.indexOf("50") === 0 ||
      cardNum.indexOf("60") === 0 ||
      cardNum.indexOf("65") === 0
    ) {
      var g = "508500-508999|606985-607984|608001-608500|652150-653149";
      var i = g.split("|");
      for (var d = 0; d < i.length; d++) {
        var c = parseInt(i[d].split("-")[0], 10);
        var f = parseInt(i[d].split("-")[1], 10);
        if (
          cardNum.substr(0, 6) >= c &&
          cardNum.substr(0, 6) <= f &&
          cardNum.length >= 6
        ) {
          payCardType = "RUPAY";
          break;
        }
      }
    }
    return payCardType;
  }

  luhnCheck(cardNum) {
    // Luhn Check Code from https://gist.github.com/4075533
    // accept only digits, dashes or spaces
    var numericDashRegex = /^[\d\-\s]+$/;
    if (!numericDashRegex.test(cardNum)) return false;

    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0,
      nDigit = 0,
      bEven = false;
    var strippedField = cardNum.replace(/\D/g, "");

    for (var n = strippedField.length - 1; n >= 0; n--) {
      var cDigit = strippedField.charAt(n);
      nDigit = parseInt(cDigit, 10);
      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 === 0;
  }
  get hasCreditCardInfo(): boolean {
    if (this.creditCards && this.creditCards.length > 0) return true;
    return false;
  }

  onSubmit() {}
}
