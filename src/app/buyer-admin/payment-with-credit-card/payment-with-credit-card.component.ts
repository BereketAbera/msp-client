import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

import { ZipcodeService } from '../../service/zipcode.service';
import { ZipCode } from '../../model/zipCode';

import { CreditCardValidator } from 'angular-cc-library';
import { Product } from '../../model/product';
import { DataStorageService } from '../../service/data-storage.service';
import { TransactionService } from '../../service/transaction.service';
import { PaymentInfo } from '../../model/paymentInfo';

@Component({
  selector: 'payment-with-credit-card',
  templateUrl: './payment-with-credit-card.component.html',
  styleUrls: ['./payment-with-credit-card.component.css']
})
export class PaymentWithCreditCardComponent implements OnInit {
  @Output() payWith = new EventEmitter<any>();
  @Input() data: PaymentInfo;

  PAY_WITH_NEW_CARD: string = "PAY_WITH_NEW_CREDIT";
  PAY_WITH_SAVED_CARD: string = "PAY_WITH_SAVED_CREDIT";
  PAY_WITH_BALANCE: string = "PAY_WITH_BALANCE";

  showError: boolean = false;
  errors = [];

  product: Product;
  ordrGuid: string;
  tax: number = 0;
  balance: number = 0;
  minimumAmount: number = 0;
  orderAmount: number = 0;
  hasCreditCardInfo: boolean = false;
  zipCodeHints$ = new Observable<ZipCode[]>();
  creditInfoAvailable: boolean = false;

  paymentForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
    expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
    cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]],
    rememberCrdt: false,
    deposit: ["", Validators.required],
    paymentType: [this.PAY_WITH_NEW_CARD, Validators.required]
  });
  constructor(private trnsService: TransactionService, private dsService: DataStorageService, private fb: FormBuilder, private zipCodeService: ZipcodeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ordrGuid = this.data.ordrGuid;
    this.balance = this.data.balance;
    this.orderAmount = this.data.total;
    this.creditInfoAvailable = this.data.savedCreditCard;
    if(this.orderAmount > this.balance)
      this.minimumAmount = this.orderAmount - this.balance
    else
      this.minimumAmount = this.orderAmount;

    this.minimumAmount = +this.minimumAmount.toFixed(2);
    this.paymentForm.get('deposit').setValue(this.minimumAmount.toFixed(2));

    this.zipCodeHints$ = this.paymentForm.get('zipCode').valueChanges.pipe(
      debounceTime(500),
      filter(txt => {
        if (!txt || txt == "") return false;

        return txt.toString().length > 3;
      }),
      distinctUntilChanged(),
      switchMap(searchTXT =>
        this.zipCodeService.listZipcods(searchTXT))
    );
  }
  getErrorMessage() {

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
  payWithBalance() {
    this.payWith.emit(this.PAY_WITH_BALANCE);
  }
  payWithSavedCredit() {
    this.payWith.emit(this.PAY_WITH_SAVED_CARD);
  }
  goToHome(){
    this.router.navigate(['/']);
  }
  goToDeposit(){
    this.router.navigate(['../../deposit'],{relativeTo: this.route});
  }
  onSubmit() {
    let transction: any = this.paymentForm.value;
    transction.ordrGuid = this.ordrGuid;
    transction.cardType = this.getCardType(transction.creditCard);

    this.trnsService.createTransaction(transction).subscribe(res => {
      if (res['success']) {
        this.router.navigate(["../../"], { relativeTo: this.route });
      } else {
        this.showError = true;
        this.errors = res['messages'];
      }
      
    });
  }
  get isFundAvailable(): boolean {
    if (this.balance >= this.orderAmount)
      return true;
    return false;
  }
  close() {
    this.showError = false;
  }

}
