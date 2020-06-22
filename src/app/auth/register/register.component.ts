import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  hide = true;

  registrationForm = this.fb.group({
    fullName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    role: ["", Validators.required],
  });

  constructor(private userService: UserService, private fb: FormBuilder) {}
  ngOnInit() {}
  onSubmit() {
    return this.userService
      .registerUser(this.registrationForm.value)
      .subscribe((res) => {
        // console.log("user created");
      });
  }
  getErrorMessage() {
    return this.registrationForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.registrationForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
}
