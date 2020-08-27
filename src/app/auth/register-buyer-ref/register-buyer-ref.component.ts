import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import { UserService } from "../../service/user.service";
import { RegistrationCompleteComponent } from "../registration-complete/registration-complete.component";

@Component({
  selector: "app-register-buyer-ref",
  templateUrl: "./register-buyer-ref.component.html",
  styleUrls: ["./register-buyer-ref.component.scss"],
})
export class RegisterBuyerRefComponent implements OnInit {
  @Output() registeredByr: EventEmitter<any> = new EventEmitter();
  hide = true;
  errors;
  showError: boolean = false;
  tk: string;
  referedEmail = "";
  submitBtnStyle = {
    btn: { width: "100%", fontSize: "2rem", height: "4rem" },
  };
  registrationForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phoneNumber: [
      "",
      [Validators.required, Validators.pattern(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/)],
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
  });
  loading: boolean = false;
  prevValue = "";

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  close() {
    this.showError = false;
  }
  ngOnInit() {
    this.route.queryParams
      .filter((params) => params.tk)
      .subscribe((params) => {
        this.tk = params.tk;
        this.userService.getReferedEmail(this.tk).subscribe((rslt) => {
          this.registrationForm.get("email").setValue(rslt["email"]);
        });
      });

    this.registrationForm.controls["phoneNumber"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
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
    this.showError = false;
    this.errors = [];

    if (this.registrationForm.valid) {
      if (this.registrationForm.get("agreed").value) {
        let phoneNumber = this.registrationForm.controls["phoneNumber"];
        // phoneNumber.setValue(this.phoneChangeFormat(phoneNumber.value, "db"));
        let usrInfo = this.registrationForm.value;
        usrInfo.tk = this.tk;
        usrInfo.phoneNumber = this.phoneChangeFormat(phoneNumber.value, "db");
        this.loading = true;
        return this.userService
          .registerByrUser(usrInfo)
          .subscribe((res: any) => {
            // console.log(res);
            this.loading = false;
            window.scrollTo(0, 0);
            if (res["success"]) {
              if (res.user && res.user.applicationName) {
                const dialogRef = this.dialog.open(
                  RegistrationCompleteComponent,
                  {
                    width: "350px",
                    data: {
                      msg: `The email ${
                        res.user.email
                      } is already registered in ${
                        res.user.applicationName
                      }.COM as ${
                        res.user.role == "STAFFER"
                          ? "EMPLOYER STAFF"
                          : res.user.role
                      }. You can use this email to sign in to ManagerSpecial and become a ${
                        res.user.role == "APPLICANT" ? "BUYER" : "SELLER"
                      }. Please try logging in or use another email.`,
                    },
                  }
                );
                dialogRef.afterClosed().subscribe((result) => {
                  this.router.navigate([`/login/seller`], {
                    queryParams: { email: res.user.email, tk: this.tk },
                  });
                });
              } else {
                const dialogRef = this.dialog.open(
                  RegistrationCompleteComponent,
                  {
                    width: "350px",
                    data: { msg: "Thank you! Now you can login" },
                  }
                );
                dialogRef.afterClosed().subscribe((result) => {
                  this.router
                    .navigateByUrl("/RefrshComponent", {
                      skipLocationChange: true,
                    })
                    .then(() => this.router.navigate(["/login"]));
                });
              }
            } else {
              this.showError = true;
              this.errors = res["messages"];
            }
          });
      } else {
        this.showError = true;
        this.errors = ["Please agree to the buyer's terms of use and privacy."];
        window.scrollTo(0, 0);
      }
    } else {
      this.showError = true;
      this.errors = ["Invalid input! Check again."];
      window.scrollTo(0, 0);
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
    if (
      !(
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode == 8
      )
    ) {
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
}
