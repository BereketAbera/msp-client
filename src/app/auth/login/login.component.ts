import { Component, Input, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../service/auth.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  selectedIndex: number = 0;
  hide = true;
  errors;
  version = environment.version;
  showError: boolean = false;
  type = "normal";
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.minLength(3)]],
    password: ["", Validators.required],
  });
  loading = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get("type");
    if (!this.type) this.type = "normal";
  }
  getErrorMessage() {
    return this.loginForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.loginForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
  get showSingIn() {
    if (this.type == "normal") return true;
    return false;
  }
  get showBuyer() {
    if (this.type == "normal") return true;
    return false;
  }
  get showSeller() {
    if (this.type == "normal") return true;
    return false;
  }
  setSelectedIndexBuyer() {
    this.selectedIndex = 0;
    this.type = "buyer";
  }
  setSelectedIndexSeller() {
    this.selectedIndex = 0;
    this.type = "seller";
  }
  close() {
    this.showError = false;
  }
  onSubmit() {
    this.errors = null;
    this.showError = false;
    this.loading = true;
    return this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        this.loading = false;
        if (this.authService.redirectURL) {
          this.router.navigateByUrl(this.authService.redirectURL);
        } else this.router.navigate([this.authService.defaultNavigationURL]);
      },
      (error) => {
        this.showError = true;
        this.errors = error.messages;
        this.loading = false;
      }
    );
  }
}
