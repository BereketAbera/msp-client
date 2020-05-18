import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
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
  selector: "app-refer",
  templateUrl: "./refer.component.html",
  styleUrls: ["./refer.component.scss"],
})
export class ReferComponent implements OnInit {
  emails = [];
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(private userService: UserService) {}
  addEmail() {
    if (
      this.emailFormControl.valid &&
      this.emails.indexOf(this.emailFormControl.value) < 0
    ) {
      this.emails.push(this.emailFormControl.value);
      this.emailFormControl.reset();
    }
  }
  remove(email: string) {
    let indx = this.emails.indexOf(email);
    if (indx >= 0) this.emails.splice(indx);
  }
  inviteUsers() {
    this.userService.inviteSellers(this.emails).subscribe((rsp) => {
      alert("Invitation sent to users");
    });
  }
  ngOnInit() {}
}
