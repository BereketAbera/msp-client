import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

import { ZipcodeService } from '../../service/zipcode.service';
import { ZipCode } from '../../model/zipCode';

import { CreditCardValidator } from 'angular-cc-library';
import { DataStorageService } from '../../service/data-storage.service';
import { TransactionService } from '../../service/transaction.service';


@Component({
  selector: 'app-deposite-with-new-credit-card',
  templateUrl: './deposite-with-new-credit-card.component.html',
  styleUrls: ['./deposite-with-new-credit-card.component.css']
})
export class DepositeWithNewCreditCardComponent implements OnInit {

  @Output() payWith = new EventEmitter<any>();

  showError: boolean = false;
  errors = [];

  PAY_WITH_NEW_CARD: string = "PAY_WITH_NEW_CREDIT";
  PAY_WITH_SAVED_CARD: string = "PAY_WITH_SAVED_CREDIT";
  PAY_WITH_BALANCE: string = "PAY_WITH_BALANCE";



  minimumAmount: number = 10;
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
    deposit: ["10.00", [Validators.required, Validators.min(10)]],
    paymentType: [this.PAY_WITH_NEW_CARD, Validators.required]
  });
  constructor(private trnsService: TransactionService, private dsService: DataStorageService, private fb: FormBuilder, private zipCodeService: ZipcodeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paymentForm.get('deposit').valueChanges.pipe(
      debounceTime(1000)
    )
    .subscribe(inpValue=> {
      if(inpValue){
      if(/^\d+$/.test(inpValue.toString()) && !inpValue.toString().includes('.'))
        this.paymentForm.get('deposit').setValue(inpValue + ".00");
      }
    });
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
  goToHome() {
    this.router.navigate(['/']);
  }
  close() {
    this.showError = false;
  }
  onSubmit() {
    if (this.paymentForm.get('cvc') && (this.paymentForm.get('cvc').value.toString().length >= 3 && this.paymentForm.get('cvc').value.toString().length <= 4)) {
      let depositAmnt = this.paymentForm.get('deposit').value;
      if (!isNaN(depositAmnt) && parseFloat(depositAmnt) >= 10) {
        let transction: any = this.paymentForm.value;
        transction.cardType = this.getCardType(transction.creditCard);
        this.trnsService.createDeposit(transction).subscribe(res => {
          if (res['success']) {
            this.router.navigate(["../trnsctns"], { relativeTo: this.route });
          } else {
            this.showError = true;
            this.errors = res['messages'];
          }
          
        });
      } else {
        alert("invalid deposit amount");
      }
    } else {
      alert("invalid cvc");
    }
  }
}

