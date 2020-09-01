import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "buyer-confirm-code",
  templateUrl: "./confirm-code.component.html",
  styleUrls: ["./confirm-code.component.scss"],
})
export class ConfirmCodeComponent implements OnInit {
  error = "";
  message = "";
  phoneNumber = "";
  confirmCode = this.fb.group({
    code: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private _location: Location,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.phoneNumber = params.get("phoneNumber");
      // console.log(this.phoneNumber);
    });
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.error = "";
    this.userService
      .changePhoneNumber(this.confirmCode.controls["code"].value)
      .subscribe((res) => {
        // console.log(res);
        if (res.success) {
          this.goBack();
        } else {
          this.error = "Invalid Activation Code";
        }
      });
  }

  close() {
    this.error = "";
  }

  resend() {
    this.error = "";
    this.message = "";
    if (this.phoneNumber) {
      this.userService
        .sendPhonenNumberCode(this.phoneNumber)
        .subscribe((res) => {
          // console.log(res);
          if (res.success) {
            this.message = "Successfully sent";
          } else {
            this.message = "Try again in 1 minute.";
          }
        });
    }
  }
}
