import { AuthService } from "./../../service/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import "rxjs/add/operator/filter";
import { debounceTime } from "rxjs/operators/debounceTime";
import { switchMap } from "rxjs/operators/switchMap";
import { Category } from "src/app/model/category";
import { State } from "src/app/model/state";
import { ZipCode } from "src/app/model/zipCode";
import { ZipcodeService } from "src/app/service/zipcode.service";
import { UserService } from "../../service/user.service";
import { RegistrationCompleteComponent } from "../registration-complete/registration-complete.component";

let zipCodeHints = [];

@Component({
  selector: "app-register-seller-ref",
  templateUrl: "./register-seller-ref.component.html",
  styleUrls: ["./register-seller-ref.component.scss"],
})
export class RegisterSellerRefComponent implements OnInit {
  tk: string;
  hide = true;
  errors;
  showError: boolean = false;
  referedEmail = "";
  categories: any;
  zipCodeHints: ZipCode[];
  states: State[];
  prevValue = "";
  submitBtnStyle = {
    btn: { width: "100%", fontSize: "2rem", height: "4rem" },
  };
  registrationForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    companyName: ["", Validators.required],
    phoneNumber: [
      "",
      [Validators.required, Validators.pattern(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/)],
    ],
    address: ["", Validators.required],
    websiteURL: [""],
    email: ["", [Validators.required, Validators.email]],
    zipcode: [
      "",
      [Validators.required, Validators.pattern(/\d{5}/)],
      zipCodeValidator,
    ],
    city: ["", Validators.required],
    state: [""],
    password: [
      "",
      [
        Validators.required,
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/),
      ],
    ],
    confirmPassword: ["", Validators.required],
    agreed: [false, Validators.required],
    role: ["SELLER", Validators.required],
    subCategoryId: [1, Validators.required],
  });
  loading: boolean = false;
  valueSet = false;
  email = "";

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private zipcodeService: ZipcodeService
  ) {}

  ngOnInit() {
    this.authService.progressBarActive.next(false);
    this.route.data.subscribe(
      (data: { categories: Category[]; states: State[] }) => {
        this.states = data.states;
        // console.log(data);
      }
    );
    this.route.queryParams
      .filter((params) => params.tk)
      .subscribe((params) => {
        this.tk = params.tk;
        this.userService.getReferedEmail(this.tk).subscribe((rslt) => {
          this.registrationForm.get("email").setValue(rslt["email"]);
          this.email = rslt["email"];
        });
      });

    this.registrationForm.controls["zipcode"].valueChanges
      .pipe(
        debounceTime(200),
        switchMap((term) => this.zipcodeService.searchAddress(term))
      )
      .subscribe((zipCodeHints) => this.getlocations(zipCodeHints));
    this.registrationForm.controls["phoneNumber"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
  }
  close() {
    this.showError = false;
  }
  getErrorMessage() {
    return this.registrationForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.registrationForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
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
        // usrInfo.phoneNumber = "+251931644114"
        this.loading = true;
        return this.userService
          .registerSlrUser(usrInfo)
          .subscribe((res: any) => {
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
              this.loading = false;
              window.scrollTo(0, 0);
              if (res["success"]) {
                const dialogRef = this.dialog.open(
                  RegistrationCompleteComponent,
                  {
                    width: "350px",
                    data: {
                      msg:
                        "Thank you! Now please check your email for our email and phone number verification.",
                    },
                  }
                );
                dialogRef.afterClosed().subscribe((result) => {
                  this.router
                    .navigateByUrl("/RefrshComponent", {
                      skipLocationChange: true,
                    })
                    .then(() => this.router.navigate(["/login/seller"]));
                });

                //this.registeredSlr.emit("seller");
              } else {
                this.showError = true;
                this.errors = res["messages"];
                window.scrollTo(0, 0);
              }
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
      this.errors = ["Invalid Input! Check again"];
    }
  }

  getlocations(zipCodes) {
    // console.log(zipCodes);
    let zipCodeFound = false;
    this.zipCodeHints = zipCodes;
    zipCodeHints = this.zipCodeHints;
    if (
      this.registrationForm.controls["zipcode"].value.length == 5 &&
      !this.valueSet
    ) {
      this.valueSet = true;
      this.registrationForm
        .get("zipcode")
        .setValue(this.registrationForm.controls["zipcode"].value);
    } else {
      this.valueSet = false;
    }
    this.zipCodeHints.map((zipcode) => {
      if (this.registrationForm.get("zipcode").value == zipcode.ZIPCode) {
        zipCodeFound = true;
        this.registrationForm
          .get("state")
          .setValue(this.getStateName(zipcode.StateAbbr));
      }
    });
    if (!zipCodeFound) {
      this.registrationForm.get("state").setValue("");
    }
  }

  getStateName(abbr) {
    let name = null;
    this.states.map((state) => {
      if (state.abbreviation == abbr) {
        name = state.name;
      }
    });

    return name;
  }

  zipCodeSelected(zipcode) {
    this.registrationForm
      .get("state")
      .setValue(this.getStateName(zipcode.StateAbbr));
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

function zipCodeValidator(control: FormControl) {
  let zipCode = control.value;

  let found = false;

  zipCodeHints.map((zch) => {
    if (zch.ZIPCode == zipCode) {
      found = true;
    }
  });

  return found ? of(null) : of({ error: "zipcode is not valid" });
}
