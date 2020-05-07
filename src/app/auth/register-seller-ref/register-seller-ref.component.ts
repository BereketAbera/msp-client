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
    phoneNumber: ["", Validators.required],
    address: ["", Validators.required],
    websiteURL: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    zipcode: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required],
    agreed: [false, Validators.required],
    role: ["SELLER", Validators.required],
    subCategoryId: ["", Validators.required],
  });

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
        this.categories = data.categories;
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
        let usrInfo = this.registrationForm.value;
        usrInfo.tk = this.tk;
        return this.userService.registerSlrUser(usrInfo).subscribe((res) => {
          if (res["success"]) {
            const dialogRef = this.dialog.open(RegistrationCompleteComponent, {
              width: "350px",
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
          }
        });
      } else {
        this.showError = true;
        this.errors = ["Please agree to the buyer's terms of use and privacy."];
      }
    } else {
      this.showError = true;
      this.errors = ["Invalid Input! Check again"];
    }
  }

  getlocations(q) {
    if (q.length > 2) {
      this.zipcodeService.searchAddress(q).subscribe(
        (response) => {
          this.zipCodeHints = response;
        },
        (err) => console.log(err)
      );
    }
  }
}
