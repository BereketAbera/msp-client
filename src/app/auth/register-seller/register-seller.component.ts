import { ZipcodeService } from "./../../service/zipcode.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../service/user.service";

import { RegistrationCompleteComponent } from "../registration-complete/registration-complete.component";
import { Category } from "src/app/model/category";
import { ZipCode } from "src/app/model/zipCode";
import { State } from "src/app/model/state";

@Component({
  selector: "app-register-seller",
  templateUrl: "./register-seller.component.html",
  styleUrls: ["./register-seller.component.scss"],
})
export class RegisterSellerComponent implements OnInit {
  @Output() registeredSlr: EventEmitter<any> = new EventEmitter();
  hide = true;
  errors;
  showError: boolean = false;
  categories: any;
  zipCodeHints: ZipCode[];
  states: State[];
  loading=false;
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
    // subCategoryId: ["", Validators.required],
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private zipcodeService: ZipcodeService
  ) {}
  ngOnInit() {
    this.route.data.subscribe(
      (data: { categories: Category[]; states: State[] }) => {
        // this.categories = data.categories;
        this.states = data.states;
        // console.log(data);
      }
    );
  }
  openTerms() {}
  openPrivacy() {}
  close() {
    this.showError = false;
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
        this.loading = true;
        return this.userService
          .registerUser(this.registrationForm.value)
          .subscribe((res) => {
            this.loading=false;
            if (res["success"]) {
              const dialogRef = this.dialog.open(
                RegistrationCompleteComponent,
                {
                  width: "350px",
                  data: { msg: 'Thank you! Now please check your email for our email verfication.' }

                }
              );
              dialogRef.afterClosed().subscribe((result) => {
                this.router.navigate(["/login/seller"]);
                // this.router
                //   .navigateByUrl("/RefrshComponent", {
                //     skipLocationChange: true,
                //   })
                //   .then(() => this.router.navigate(["/login/seller"]));
              });

              //this.registeredSlr.emit("seller");
            } else {
              this.showError = true;
              this.errors = res["messages"];
            }
          });
      } else {
        this.showError = true;
        this.errors = [
          "Please agree to the Seller's terms of use and privacy.",
        ];
      }
    } else {
      this.showError = true;
      this.errors = ["Invalid input! Check Again"];
    }
  }
  getErrorMessage() {
    return this.registrationForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.registrationForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
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
