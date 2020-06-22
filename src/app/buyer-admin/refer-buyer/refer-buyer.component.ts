import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ConfiguartionService } from "src/app/service/configuartion.service";
import { UserService } from "../../service/user.service";
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-refer-buyer",
  templateUrl: "./refer-buyer.component.html",
  styleUrls: ["./refer-buyer.component.scss"],
})
export class ReferBuyerComponent implements OnInit {
  showErrorNotification = false;
  errorMessage = "";
  emails = [];
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  showSuccessNotification = false;
  config: any;

  constructor(
    private userService: UserService,
    private configService: ConfiguartionService
  ) {}
  addEmail() {
    if (
      this.emailFormControl.valid &&
      this.emails.indexOf(this.emailFormControl.value) < 0
    ) {
      this.userService
        .isEmailUsed(this.emailFormControl.value)
        .subscribe((rslt) => {
          if (!rslt["isUsed"]) {
            this.emails.push(this.emailFormControl.value);
            this.emailFormControl.reset();
          } else {
            this.errorMessage = "Sorry, Email is already in use";
            this.showErrorNotification = true;
          }
        });
    }
  }
  remove(email: string) {
    let indx = this.emails.indexOf(email);
    if (indx >= 0) this.emails.splice(indx);
  }
  inviteUsers() {
    this.userService.inviteBuyers(this.emails).subscribe((rsp) => {
      this.errorMessage = "Invitation succesfully sent to user";
      this.showSuccessNotification = true;
      this.emails = [];
    });
  }
  ngOnInit() {
    this.config = this.configService.configData;
  }
  showNotification($event) {
    this.showErrorNotification = $event;
    this.showSuccessNotification = $event;
  }
}
