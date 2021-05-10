import { AdminService } from "src/app/service/admin.service";
import { Router } from "@angular/router";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmNewPassword: ["", Validators.required]
    });
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      if (this.f.newPassword.value === this.f.confirmNewPassword.value) {
        this.adminService.changePassword(this.changePasswordForm.value).subscribe(
          (res) => {
            if (res.success) this.router.navigateByUrl("/tlgu-admin");
            else this.errorMessage = "Can not change password";
          },
          (error) => {
            this.errorMessage = "Can not change password";
          }
        );
      }
    }
  }

  gotoHome() {
    this.router.navigate(["/tlgu-admin"]);
  }
}
