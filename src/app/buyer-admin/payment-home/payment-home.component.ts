import { Component, OnInit,ComponentFactoryResolver,ViewChild} from '@angular/core';
import {PaymentTypeDirective} from '../payment-type/payment-type.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { Balance } from '../../model/balance';
import { CreditCard } from '../../model/creditCard';
import {PaymentInfo} from '../../model/paymentInfo';

import {CartService} from '../../service/cart.service';
import {ReserveProduct} from '../../model/reserve-product';

import {PaymentWithCreditCardComponent} from '../payment-with-credit-card/payment-with-credit-card.component';
import {PaymentWithBalanceComponent} from '../payment-with-balance/payment-with-balance.component';
import {PaymentWithSavedCreditCardComponent} from '../payment-with-saved-credit-card/payment-with-saved-credit-card.component';
@Component({
  selector: 'app-payment-home',
  templateUrl: './payment-home.component.html',
  styleUrls: ['./payment-home.component.scss']
})

export class PaymentHomeComponent implements OnInit {
  @ViewChild(PaymentTypeDirective) paymentType: PaymentTypeDirective;
  product: Product;
  cartProducts: ReserveProduct[];
  creditCards: CreditCard[];
  productId: number = 0;
  quantity: number = 0;
  tax: number = 0;
  balance: number = 0;
  homeBalance:number =0;
  payAmount: number = 0;

  total:number = 0;
  savings:number = 0;
  totalMSPMarkup:number = 0;
  
 
  PAY_WITH_NEW_CARD:string = "PAY_WITH_NEW_CREDIT";
  PAY_WITH_SAVED_CARD:string = "PAY_WITH_SAVED_CREDIT";
  PAY_WITH_BALANCE:string = "PAY_WITH_BALANCE";
  
  
  
  paymentInfo:PaymentInfo;
   
  constructor(private cartService:CartService, private cmpntFctryResolver:ComponentFactoryResolver,  private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCartProduct();
    this.quantity = 1;//+this.route.snapshot.queryParamMap.get('quantity');
    this.productId = 2; //+this.route.snapshot.queryParamMap.get('productId');
    this.route.data
      .subscribe((data: { balance: Balance, creditCards: CreditCard[] }) => {
        //this.product = data.product;
        this.creditCards = data.creditCards;
        this.tax = 0; //this.product.shop.tax;
        //this.payAmount = 0;//this.quantity * this.product.discountPrice * (1 + this.tax / 100);
        //this.payAmount = parseFloat((Math.round( this.payAmount * 100 ) / 100).toFixed(2));
        this.balance = data.balance.amount;
        this.homeBalance = 1;
        this.paymentInfo = {
          ordrGuid:this.cartService.getCartGuid(),
          total:this.payAmount,
          savings:this.savings,
          balance:this.balance,
          savedCreditCard:this.hasCreditCardInfo,
          creditCards:this.creditCards
        }
        if(this.isFundAvailable){
          this.loadPaymentWithBalanceComponent();
        }else{
          if(this.hasCreditCardInfo){
            this.loadPaymentWithCreditCardComponent();
          }else{
            this.loadPaymentWithNewCreditCardComponent();
          }
        }
      });
    
  }
  getErrorMessage() {

  }
  getCartProduct() {
		this.cartProducts = this.cartService.getLocalCartProducts();
		this.getTotalPrice();
  }
  getTotalPrice(){
    if(this.cartProducts.length > 0){
          this.cartProducts.forEach(element => {
        this.total += element.disPrice * element.qty;
        this.payAmount += element.disPrice * element.qty * element.mspMarkup/100;
        this.savings += (element.regPrice * element.qty) - (element.disPrice * element.qty);
      });
     }else{
       this.total = 0;
       this.payAmount = 0;
     }
 }
  loadPaymentWithBalanceComponent(){
    let componentFactory = this.cmpntFctryResolver.resolveComponentFactory(PaymentWithBalanceComponent);

    let viewContainerRef = this.paymentType.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<PaymentWithBalanceComponent>componentRef.instance).data = this.paymentInfo;
    (<PaymentWithBalanceComponent>componentRef.instance).payWith.subscribe(type=>{
         if(type == this.PAY_WITH_NEW_CARD)
          this.loadPaymentWithNewCreditCardComponent();
          else if(type == this.PAY_WITH_SAVED_CARD)
          this.loadPaymentWithCreditCardComponent();
    });
  }
  loadPaymentWithCreditCardComponent(){

    let componentFactory = this.cmpntFctryResolver.resolveComponentFactory(PaymentWithSavedCreditCardComponent);
    let viewContainerRef = this.paymentType.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<PaymentWithSavedCreditCardComponent>componentRef.instance).data = this.paymentInfo;
    (<PaymentWithSavedCreditCardComponent>componentRef.instance).payWith.subscribe(type=>{
      if(type == this.PAY_WITH_NEW_CARD)
      this.loadPaymentWithNewCreditCardComponent();
      else if(type == this.PAY_WITH_BALANCE)
      this.loadPaymentWithBalanceComponent();
    });
    
  }
  loadPaymentWithNewCreditCardComponent() {
    

    let componentFactory = this.cmpntFctryResolver.resolveComponentFactory(PaymentWithCreditCardComponent);
    let viewContainerRef = this.paymentType.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<PaymentWithCreditCardComponent>componentRef.instance).data = this.paymentInfo;
    (<PaymentWithCreditCardComponent>componentRef.instance).payWith.subscribe(type=>{
      if(type == this.PAY_WITH_SAVED_CARD)
      this.loadPaymentWithCreditCardComponent();
      else if(type == this.PAY_WITH_BALANCE)
      this.loadPaymentWithBalanceComponent();
    });
    
  }
  getCardType(cardNum) {

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

  }


  luhnCheck(cardNum) {
    // Luhn Check Code from https://gist.github.com/4075533
    // accept only digits, dashes or spaces
    var numericDashRegex = /^[\d\-\s]+$/
    if (!numericDashRegex.test(cardNum)) return false;

    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0, nDigit = 0, bEven = false;
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

    return (nCheck % 10) === 0;
  }
  get hasCreditCardInfo(): boolean {
    if (this.creditCards && this.creditCards.length > 0)
      return true;
    return false;
  }
  get isFundAvailable(): boolean {
    if (this.balance >= this.payAmount)
      return true;
    return false;
  }
  
  
  onSubmit() {
    
  }
}
