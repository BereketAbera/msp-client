import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime } from "rxjs/operators";
import { PaymentInfo } from "../../model/paymentInfo";
import { TransactionService } from "../../service/transaction.service";

@Component({
  selector: "app-deposite-with-saved-credit-card",
  templateUrl: "./deposite-with-saved-credit-card.component.html",
  styleUrls: ["./deposite-with-saved-credit-card.component.scss"],
})
export class DepositeWithSavedCreditCardComponent implements OnInit {
  @Output() payWith = new EventEmitter<any>();
  @Input() data: PaymentInfo;

  showError: boolean = false;
  errors = [];

  PAY_WITH_NEW_CARD: string = "PAY_WITH_NEW_CREDIT";
  PAY_WITH_SAVED_CARD: string = "PAY_WITH_SAVED_CREDIT";
  PAY_WITH_BALANCE: string = "PAY_WITH_BALANCE";

  paymentInfo: PaymentInfo;

  minimumAmount: number = 10;
  balance: number = 0;

  paymentForm = this.fb.group({
    paymentInfoId: ["", Validators.required],
    cvc: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
    ],
    deposit: ["10.00", [Validators.required, Validators.min(10)]],
    paymentType: [this.PAY_WITH_SAVED_CARD, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private trnsService: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paymentForm
      .get("deposit")
      .valueChanges.pipe(debounceTime(1000))
      .subscribe((inpValue) => {
        if (inpValue) {
          if (
            /^\d+$/.test(inpValue.toString()) &&
            !inpValue.toString().includes(".")
          )
            this.paymentForm.get("deposit").setValue(inpValue + ".00");
        }
      });
    this.paymentForm.get("paymentInfoId").setValue(this.data.creditCards[0].id);
  }

  payWithBalance() {
    this.payWith.emit(this.PAY_WITH_BALANCE);
  }
  payWithNewCredit() {
    this.payWith.emit(this.PAY_WITH_NEW_CARD);
  }
  goToHome() {
    this.router.navigate(["/"]);
  }
  close() {
    this.showError = false;
  }
  onSubmit() {
    if (
      this.paymentForm.get("cvc") &&
      this.paymentForm.get("cvc").value.length >= 3 &&
      this.paymentForm.get("cvc").value.length <= 4
    ) {
      let depositAmnt = this.paymentForm.get("deposit").value;
      if (!isNaN(depositAmnt) && parseFloat(depositAmnt) >= 10) {
        let transction: any = this.paymentForm.value;
        this.trnsService.createDeposit(transction).subscribe((res) => {
          if (res["success"]) {
            this.router.navigate(["../trnsctns"], { relativeTo: this.route });
          } else {
            this.showError = true;
            this.errors = res["messages"];
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
