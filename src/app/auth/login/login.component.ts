import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../service/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  selectedIndex: number = 0;
  hide = true;
  errors;
  version = environment.version;
  showError: boolean = false;
  type = "normal";
  submitBtnStyle = {
    btn: { width: '100%',  fontSize: '2rem',height:'4rem' },
  };
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
    this.authService.progressBarActive.next(false);
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
        this.authService.progressBarActive.next(true);
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
