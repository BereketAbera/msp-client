import { AuthService } from "@app/service/auth.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { CartExpiredDialogComponent } from "../../components/cart-expired-dialog/cart-expired-dialog.component";
import { PaymentInfo } from "../../model/paymentInfo";
import { CartService } from "../../service/cart.service";
import { TransactionService } from "../../service/transaction.service";
import { debounceTime, switchMap } from "rxjs/operators";
import { of } from "rxjs";

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
  disabled = false;

  // take_out = false;
  // special_requirements = "";
  // phoneNumber = "";

  PAY_WITH_NEW_CARD: string = "PAY_WITH_NEW_CREDIT";
  PAY_WITH_SAVED_CARD: string = "PAY_WITH_SAVED_CREDIT";
  PAY_WITH_BALANCE: string = "PAY_WITH_BALANCE";
  showSuccessNotification = false;
  creditInfoAvailable: boolean = false;
  quantity: number = 0;
  ordrGuid: string;
  balance: number = 0;
  orderAmount: number = 0;
  minimumAmount: string;
  paymentForm = this.fb.group({
    deposit: ["", Validators.required],
    paymentType: [this.PAY_WITH_BALANCE, Validators.required],
    allowCallPhoneNumber: [true],
    phoneNumber: ["", [Validators.required, Validators.pattern(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/)]]
  });

  prevValue = "";

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private trnsService: TransactionService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.ordrGuid = this.data.ordrGuid;
    this.balance = this.data.balance;
    this.orderAmount = +this.data.total.toFixed(2);
    this.creditInfoAvailable = this.data.savedCreditCard;
    this.minimumAmount = (this.orderAmount - this.balance).toFixed(2);
    this.paymentForm.controls["phoneNumber"].setValue(
      this.phoneChangeFormat(this.data.phoneNumber, "form")
    );
    //this.paymentForm.get('deposit').setValue(this.minimumAmount.toFixed(2));

    this.paymentForm.controls["phoneNumber"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
    this.authService.redirectURL = null;
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
    const dialogRef = this.dialog.open(CartExpiredDialogComponent, {
      width: "350px",
      data: {
        title: "Cart Time Expired",
        message: "Sorry, your shopping cart time limit of ten minutes has expired"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.cartService.resetCart();
      this.router.navigate(["../"]);
    });
  }
  onSubmit() {
    this.showError = false;
    this.errors = [];
    console.log("about to send requrest", this.disabled);
    if (this.disabled) {
      return;
    }
    if (this.cartService.isCartExpired()) {
      this.showResetDialog();
    } else {
      if (this.paymentForm.controls["phoneNumber"].invalid) {
        this.showError = true;
        this.errors = ["Phone number is not valid"];
        return;
      } else {
        this.disabled = true;
        let transaction: any = this.paymentForm.value;
        transaction.ordrGuid = this.ordrGuid;
        transaction.phoneNumber = this.paymentForm.controls["phoneNumber"].value;
        this.trnsService.createTransaction(transaction).subscribe((res) => {
          // console.log(res);
          if (res["success"]) {
            this.cartService.resetCart();
            this.showSuccessNotification = true;
            setTimeout(() => {
              this.router.navigate(["../../"], { relativeTo: this.route });
            }, 3500);
            //
          } else {
            this.cartService.resetCart();
            this.showError = true;
            this.errors = res["messages"];
          }
        });
      }
    }
  }
  showNotification($event) {
    this.showSuccessNotification = $event;
  }

  phoneNumberChange(value) {
    let val = value;
    if (val.length > 14) {
      this.paymentForm.controls["phoneNumber"].setValue(val.slice(0, val.length - 1));
      return;
    }
    let lk = val[val.length - 1];
    if (this.prevValue.length < val.length) {
      if (lk && ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)) {
        if (val.length == 3) {
          if (val[0] == "1" || val[0] == "0") {
            this.paymentForm.controls["phoneNumber"].setValue(val.slice(1));
          }
        } else if (val.length == 4) {
          this.paymentForm.controls["phoneNumber"].setValue(`(${val.slice(0, 3)}) ${val[3]}`);
        } else if (val.length == 10) {
          this.paymentForm.controls["phoneNumber"].setValue(`${val.slice(0, 9)}-${val[9]}`);
        }
      } else if (lk) {
        this.paymentForm.controls["phoneNumber"].setValue(val.slice(0, val.length - 1));
      }
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)) {
        this.prevValue = value;
      }
    } else {
      if (val.length == 3) {
        if (val[0] == "1" || val[0] == "0") {
          this.paymentForm.controls["phoneNumber"].setValue(val.slice(1));
        }
      }
      if (val[val.length - 1] == " " && val.length == 6) {
        this.paymentForm.controls["phoneNumber"].setValue(`${val.slice(1, 4)}`);
        this.prevValue = val.slice(1, 4);
      } else if (isNaN(val) && val.length <= 4) {
        this.paymentForm.controls["phoneNumber"].setValue(`${val.replace(/\D/g, "")}`);
      } else {
        this.prevValue = this.paymentForm.controls["phoneNumber"].value;
      }
    }
  }

  phoneNumberChangeEvent(event) {
    let val = event.target.value;
    if (val.length >= 14) {
      let x = val.search(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/);
      if (x != -1) {
        let str = val.slice(x, x + 14);
        this.paymentForm.controls["phoneNumber"].setValue(str);
      } else {
        this.paymentForm.controls["phoneNumber"].setValue("");
      }
    }
  }

  preventPaste(event) {
    event.preventDefault();
  }

  phoneChangeFormat(value, type) {
    if (type == "db") {
      return "+1" + value.replace(/[()-\s]/g, "");
    } else {
      let v = value.replace("+1", "").replace(/[()-\s]/g, "");
      return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
    }
  }

  toggleCheckbox() {
    this.paymentForm.controls["takeOut"].setValue(!this.paymentForm.controls["takeOut"].value);
  }
}
