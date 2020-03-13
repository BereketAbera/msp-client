import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { PaymentInfo } from "../../model/paymentInfo";

import { CartService } from "../../service/cart.service";

import { TransactionService } from "../../service/transaction.service";
import { CartExpiredDialogComponent } from "../../components/cart-expired-dialog/cart-expired-dialog.component";

@Component({
  selector: "app-payment-with-balance",
  templateUrl: "./payment-with-balance.component.html",
  styleUrls: ["./payment-with-balance.component.scss"]
})
export class PaymentWithBalanceComponent implements OnInit {
  @Output() payWith = new EventEmitter<any>();
  @Input() data: PaymentInfo;

  showError: boolean = false;
  errors = [];

  PAY_WITH_NEW_CARD: string = "PAY_WITH_NEW_CREDIT";
  PAY_WITH_SAVED_CARD: string = "PAY_WITH_SAVED_CREDIT";
  PAY_WITH_BALANCE: string = "PAY_WITH_BALANCE";

  creditInfoAvailable: boolean = false;
  quantity: number = 0;
  ordrGuid: string;
  balance: number = 0;
  orderAmount: number = 0;
  minimumAmount: string;
  paymentForm = this.fb.group({
    deposit: ["", Validators.required],
    paymentType: [this.PAY_WITH_BALANCE, Validators.required]
  });

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private trnsService: TransactionService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ordrGuid = this.data.ordrGuid;
    this.balance = this.data.balance;
    this.orderAmount = +this.data.total.toFixed(2);
    this.creditInfoAvailable = this.data.savedCreditCard;
    this.minimumAmount = (this.orderAmount - this.balance).toFixed(2);
    //this.paymentForm.get('deposit').setValue(this.minimumAmount.toFixed(2));
  }
  payWithCredit() {
    if (this.creditInfoAvailable) this.payWith.emit(this.PAY_WITH_SAVED_CARD);
    else this.payWith.emit(this.PAY_WITH_NEW_CARD);
  }
  payWithSavedCredit() {
    this.payWith.emit(this.PAY_WITH_SAVED_CARD);
  }
  goToHome() {
    this.router.navigate(["/"]);
  }
  close() {
    this.showError = false;
  }
  showResetDialog() {
    const dialogRef = this.dialog.open(CartExpiredDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.cartService.resetCart();
      this.router.navigate(["../"]);
    });
  }
  onSubmit() {
    if (this.cartService.isCartExpired()) {
      this.showResetDialog();
    } else {
      let transction: any = this.paymentForm.value;
      transction.ordrGuid = this.ordrGuid;
      //transction.quantity = this.quantity;
      console.log(transction);
      this.trnsService.createTransaction(transction).subscribe(res => {
        if (res["success"]) {
          this.cartService.resetCart();
          this.router.navigate(["../../"], { relativeTo: this.route });
        } else {
          this.showError = true;
          this.errors = res["messages"];
        }
      });
    }
  }
}
