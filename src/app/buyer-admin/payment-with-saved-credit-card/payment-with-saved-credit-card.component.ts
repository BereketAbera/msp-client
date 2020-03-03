import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { PaymentInfo } from '../../model/paymentInfo';



@Component({
  selector: 'app-payment-with-saved-credit-card',
  templateUrl: './payment-with-saved-credit-card.component.html',
  styleUrls: ['./payment-with-saved-credit-card.component.scss']
})
export class PaymentWithSavedCreditCardComponent implements OnInit {
  @Output() payWith = new EventEmitter<any>();
  @Input() data: PaymentInfo;

  showError: boolean = false;
  errors = [];

  PAY_WITH_NEW_CARD: string = "PAY_WITH_NEW_CREDIT";
  PAY_WITH_SAVED_CARD: string = "PAY_WITH_SAVED_CREDIT";
  PAY_WITH_BALANCE: string = "PAY_WITH_BALANCE";

  ordrGuid: string;
  balance: number = 0;
  orderAmount: number = 0;
  minimumAmount: number;

  paymentForm = this.fb.group({
    paymentInfoId: ['', Validators.required],
    cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    deposit: ["", Validators.required],
    paymentType: [this.PAY_WITH_SAVED_CARD, Validators.required]
  });

  constructor(private fb: FormBuilder, private trnsService: TransactionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ordrGuid = this.data.ordrGuid;
    this.balance = this.data.balance;
    this.orderAmount = this.data.total;
    this.paymentForm.get('paymentInfoId').setValue(this.data.creditCards[0].id);
    if (this.orderAmount > this.balance)
      this.minimumAmount = this.orderAmount - this.balance
    else
      this.minimumAmount = this.orderAmount;

    this.minimumAmount = +this.minimumAmount.toFixed(2);
    this.paymentForm.get('deposit').setValue(this.minimumAmount.toFixed(2));


  }
  get isFundAvailable(): boolean {
    if (this.balance >= this.orderAmount)
      return true;
    return false;
  }
  payWithBalance() {
    this.payWith.emit(this.PAY_WITH_BALANCE);
  }
  payWithNewCredit() {
    this.payWith.emit(this.PAY_WITH_NEW_CARD);
  }
  goToHome(){
    this.router.navigate(['/']);
  }
  goToDeposit(){
    this.router.navigate(['../../deposit'],{relativeTo: this.route});
  }
  close() {
    this.showError = false;
  }
  onSubmit() {
    if (this.paymentForm.get('cvc') && (this.paymentForm.get('cvc').value.length >= 3 && this.paymentForm.get('cvc').value.length <= 4)) {
      let transction: any = this.paymentForm.value;
      transction.ordrGuid = this.ordrGuid;
      this.trnsService.createTransaction(transction).subscribe(res => {
        if (res['success']) {
          this.router.navigate(["../../"], { relativeTo: this.route });
        } else {
          this.showError = true;
          this.errors = res['messages'];
        }
     });
    }
  }

}
