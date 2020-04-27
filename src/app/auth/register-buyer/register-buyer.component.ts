import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
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
  registrationForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phoneNumber: ["", Validators.required],
    password: ["", Validators.required],
    agreed: [false, Validators.required],
    role: ["BUYER", Validators.required],
  });

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  close() {
    this.showError = false;
  }
  ngOnInit() {}
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
                .then(() => this.router.navigate(["/login/buyer"]));
            });

            //this.registeredByr.emit("Buyer")
            //this.router.navigate(['/login/buyer']);
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
  openTerms() {}
  openPrivacy() {}
  getErrorMessage() {
    return this.registrationForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.registrationForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
}
