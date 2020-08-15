import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import { UserService } from "../../service/user.service";
import { RegistrationCompleteComponent } from "../registration-complete/registration-complete.component";

@Component({
  selector: "app-register-buyer",
  templateUrl: "./register-buyer.component.html",
  styleUrls: ["./register-buyer.component.scss"],
})
export class RegisterBuyerComponent implements OnInit {
  @Output() registeredByr: EventEmitter<any> = new EventEmitter();
  hide = true;
  errors;
  showError: boolean = false;
  registrationForm: FormGroup;
  loading = false;
  prevValue = "";
  withCode = false;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: [
        "",
        [
          Validators.required,
          Validators.pattern(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/),
        ],
      ],
      confirmPassword: ["", Validators.required],
      agreed: [false, Validators.required],
      role: ["BUYER", Validators.required],
      code: [""],
    });
  }
  close() {
    this.showError = false;
  }
  ngOnInit() {
    this.registrationForm.controls["phoneNumber"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));

    this.registrationForm.controls["code"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => {
        if (res.length > 5) {
          let control = this.registrationForm.controls["code"];
          control.setValue(res.slice(0, res.length - 1));
        }
      });
  }
  onSubmit() {
    if (
      this.registrationForm.get("password").value !=
      this.registrationForm.get("confirmPassword").value
    ) {
      this.showError = true;
      this.errors = ["Your passwords do not match"];
      return;
    }

    if (this.withCode && this.registrationForm.get("code").value.length != 5) {
      this.showError = true;
      this.errors = ["Please enter your five digit code."];
      return;
    }

    this.showError = false;
    this.errors = [];
    if (this.registrationForm.valid) {
      if (this.registrationForm.get("agreed").value) {
        let phoneNumber = this.registrationForm.controls["phoneNumber"];
        this.loading = true;
        return this.userService
          .registerUser({
            ...this.registrationForm.value,
            phoneNumber: this.phoneChangeFormat(phoneNumber.value, "db"),
          })
          .subscribe((res) => {
            this.loading = false;
            window.scrollTo(0, 0);
            if (res["success"]) {
              const dialogRef = this.dialog.open(
                RegistrationCompleteComponent,
                {
                  width: "350px",
                  data: {
                    msg:
                      "Thank you! Now please check your email for our email verfication.",
                  },
                }
              );
              dialogRef.afterClosed().subscribe((result) => {
                this.router.navigate(["/login/buyer"]);
                // this.router
                //   .navigateByUrl("/RefrshComponent", { skipLocationChange: true })
                //   .then(() => this.router.navigate(["/login/buyer"]));
              });

              //this.registeredByr.emit("Buyer")
              //this.router.navigate(['/login/buyer']);
            } else {
              // console.log(res["messages"]);
              this.showError = true;
              this.errors = res["messages"];
              window.scrollTo(0, 0);
            }
          });
      } else {
        window.scrollTo(0, 0);
        this.showError = true;
        this.errors = ["Please agree to the buyer's terms of use and privacy."];
      }
    } else {
      window.scrollTo(0, 0);
      this.showError = true;
      this.errors = ["Invalid Input! Check Again"];
    }
  }
  openTerms() {}
  openPrivacy() {}
  getErrorMessage() {
    return this.registrationForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.registrationForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }

  phoneNumberChange(value) {
    let val = value;
    if (val.length > 14) {
      this.registrationForm.controls["phoneNumber"].setValue(
        val.slice(0, val.length - 1)
      );
      return;
    }
    let lk = val[val.length - 1];
    if (this.prevValue.length < val.length) {
      if (
        lk &&
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)
      ) {
        if (val.length == 3) {
          if (val[0] == "1" || val[0] == "0") {
            this.registrationForm.controls["phoneNumber"].setValue(
              val.slice(1)
            );
          }
        } else if (val.length == 4) {
          this.registrationForm.controls["phoneNumber"].setValue(
            `(${val.slice(0, 3)}) ${val[3]}`
          );
        } else if (val.length == 10) {
          this.registrationForm.controls["phoneNumber"].setValue(
            `${val.slice(0, 9)}-${val[9]}`
          );
        }
      } else if (lk) {
        this.registrationForm.controls["phoneNumber"].setValue(
          val.slice(0, val.length - 1)
        );
      }
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)) {
        this.prevValue = value;
      }
    } else {
      if (val.length == 3) {
        if (val[0] == "1" || val[0] == "0") {
          this.registrationForm.controls["phoneNumber"].setValue(val.slice(1));
        }
      }
      if (val[val.length - 1] == " " && val.length == 6) {
        this.registrationForm.controls["phoneNumber"].setValue(
          `${val.slice(1, 4)}`
        );
        this.prevValue = val.slice(1, 4);
      } else if (isNaN(val) && val.length <= 4) {
        this.registrationForm.controls["phoneNumber"].setValue(
          `${val.replace(/\D/g, "")}`
        );
      } else {
        this.prevValue = this.registrationForm.controls["phoneNumber"].value;
      }
    }
  }

  phoneNumberChangeEvent(event) {
    let val = event.target.value;
    if (val.length >= 14) {
      let x = val.search(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/);
      if (x != -1) {
        let str = val.slice(x, x + 14);
        this.registrationForm.controls["phoneNumber"].setValue(str);
      } else {
        this.registrationForm.controls["phoneNumber"].setValue("");
      }
    }
  }

  preventPaste(event) {
    event.preventDefault();
  }

  checkInput(event) {
    // console.log(event.keyCode);
    if (
      !(
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode == 8
      )
    ) {
      // console.log("returning false!!");
      return false;
    }
  }

  phoneChangeFormat(value, type) {
    if (type == "db") {
      return "+1" + value.replace(/[()-\s]/g, "");
    } else {
      let v = value.replace("+1", "").replace(/[()-\s]/g, "");
      return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
    }
  }

  changeWidthCodeStatus(event) {
    if (event.checked) {
      this.withCode = true;
    } else {
      this.registrationForm.controls["code"].setValue("");
      this.withCode = false;
    }
  }

  capitalize(value) {
    let control = this.registrationForm.controls[value];
    control.setValue(control.value.toUpperCase());
  }
}
