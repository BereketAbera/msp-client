import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  errors;
  showError: boolean = false;

  resetForm = this.fb.group({
    email: ["", [Validators.required]],
  });
  showSuccess = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  close() {
    this.showError = false;
  }

  onSubmit() {
    this.showSuccess = false;
    return this.authService.reqPwdRest(this.resetForm.value).subscribe(
      (res) => {
        this.showSuccess = true;
        // alert("Password reset instructions have been sent to your account email.");
        // this.router.navigate(["/"]);
      },
      (error) => {
        this.showError = true;
        this.errors = error.messages;
      }
    );
  }

  getErrorMessage() {
    return this.resetForm.get("email").hasError("required")
      ? "You must enter a value"
      : "";
  }
}
