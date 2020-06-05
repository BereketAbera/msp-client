import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
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
  }
  onSubmit() {
    if (
      this.registrationForm.get("password").value !=
      this.registrationForm.get("confirmPassword").value
    ) {
      this.showError = true;
      this.errors = ["Your passwords do not much"];
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
        return this.userService.registerByrUser(usrInfo).subscribe((res) => {
          // console.log(res);
          this.loading = false;
          window.scrollTo(0, 0);
          if (res["success"]) {
            const dialogRef = this.dialog.open(RegistrationCompleteComponent, {
              width: "350px",
              data: { msg: "Thank you! Now you can login" },
            });
            dialogRef.afterClosed().subscribe((result) => {
              this.router
                .navigateByUrl("/RefrshComponent", {
                  skipLocationChange: true,
                })
                .then(() => this.router.navigate(["/login"]));
            });
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
  phoneNumberChange(event) {
    let val = event.target.value;
    if (val.length != this.prevValue.length) {
      if (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode == 8
      ) {
        if (val.length > this.prevValue.length) {
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
        } else {
          if (this.prevValue[this.prevValue.length - 1] == " ") {
            this.registrationForm.controls["phoneNumber"].setValue(
              `${val.slice(1, 4)}`
            );
          }
        }
      }
    }

    this.prevValue = event.target.value;
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
