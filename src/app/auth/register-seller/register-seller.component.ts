import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../service/user.service";

import { RegistrationCompleteComponent } from "../registration-complete/registration-complete.component";
import { Category } from "src/app/model/category";

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

  registrationForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    companyName: ["", Validators.required],
    phoneNumber: ["", Validators.required],
    address: ["", Validators.required],
    websiteURL: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    agreed: [false, Validators.required],
    role: ["SELLER", Validators.required],
    subCategoryId: ["", Validators.required],
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.route.data.subscribe((data: { categories: Category[] }) => {
      this.categories = data.categories;
    });
  }
  openTerms() {}
  openPrivacy() {}
  close() {
    this.showError = false;
  }
  onSubmit() {
    if (this.registrationForm.get("agreed").value) {
      return this.userService
        .registerUser(this.registrationForm.value)
        .subscribe((res) => {
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
  }
  getErrorMessage() {
    return this.registrationForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.registrationForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
}
