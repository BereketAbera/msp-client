import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../service/user.service";

import { RegistrationCompleteComponent } from "../registration-complete/registration-complete.component";

import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/filter";
import { ZipCode } from "src/app/model/zipCode";
import { State } from "src/app/model/state";
import { ZipcodeService } from "src/app/service/zipcode.service";
import { Category } from "src/app/model/category";

import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";

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

  registrationForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    companyName: ["", Validators.required],
    phoneNumber: [
      "",
      [
        Validators.required,
        Validators.pattern(
          /1?\s?((\(\d{3}\))|(\d{3}))(-|\s)?\d{3}(-|\s)?\d{4}/
        ),
      ],
    ],
    address: ["", Validators.required],
    websiteURL: [""],
    email: ["", [Validators.required, Validators.email]],
    zipcode: ["", Validators.required],
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

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private zipcodeService: ZipcodeService
  ) {}

  ngOnInit() {
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
        });
      });
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
      this.errors = ["Your passwords do not much"];
      return;
    }
    this.showError = false;
    this.errors = [];

    if (this.registrationForm.valid) {
      if (this.registrationForm.get("agreed").value) {
        let phoneNumber = this.registrationForm.controls["phoneNumber"];
        phoneNumber.setValue(
          parsePhoneNumberFromString(phoneNumber.value, "US").number
        );
        let usrInfo = this.registrationForm.value;
        usrInfo.tk = this.tk;
        this.loading = true;
        return this.userService.registerSlrUser(usrInfo).subscribe((res) => {
          this.loading = false;
          window.scrollTo(0, 0);
          if (res["success"]) {
            const dialogRef = this.dialog.open(RegistrationCompleteComponent, {
              width: "350px",
              data: { msg: "Thank you! You can login to system." },
            });
            dialogRef.afterClosed().subscribe((result) => {
              this.router
                .navigateByUrl("/RefrshComponent", { skipLocationChange: true })
                .then(() => this.router.navigate(["/login/seller"]));
            });

            //this.registeredSlr.emit("seller");
          } else {
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
      this.errors = ["Invalid Input! Check again"];
    }
  }

  getlocations(q) {
    let zipCodeFound = false;
    if (q.length > 2) {
      this.registrationForm.get("zipcode").setValue(q);
      this.zipcodeService.searchAddress(q).subscribe(
        (response) => {
          this.zipCodeHints = response;
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
        },
        (err) => console.log(err)
      );
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

  phoneNumberChange(event) {
    let val = event.target.value;
    let obj = new AsYouType("US");
    let newVal = obj.input(val);
    if (obj) {
      this.registrationForm.controls["phoneNumber"].setValue(newVal);
    }
  }
}
