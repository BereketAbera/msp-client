import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../service/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmTermsComponent } from "../confirm-terms/confirm-terms.component";
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
    btn: { width: "100%", fontSize: "2rem", height: "4rem" },
  };
  loginForm: FormGroup;
  loading = false;

  confirmTerms = false;
  remoteUser = {};
  email = "";
  tk = "";

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.authService.progressBarActive.next(false);
    this.type = this.route.snapshot.paramMap.get("type");
    // this.email = this.route.snapshot.paramMap.get("email") || "";
    this.route.queryParamMap.subscribe((params) => {
      this.email = params.get("email");
      this.tk = params.get("tk");
    });
    // console.log(this.email);
    if (!this.type) this.type = "normal";
    this.loginForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.minLength(3)]],
      password: ["", Validators.required],
    });
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
      (res: any) => {
        this.loading = false;
        if (res && res.success) {
          this.remoteUser = res;
          this.openDialog(res);
        } else {
          this.authService.progressBarActive.next(true);
          if (this.authService.redirectURL) {
            this.router.navigateByUrl(this.authService.redirectURL);
          } else this.router.navigate([this.authService.defaultNavigationURL]);
        }
      },
      (error) => {
        this.showError = true;
        this.errors = error.messages;
        this.loading = false;
      }
    );
  }

  openDialog(res): void {
    const dialogRef = this.dialog.open(ConfirmTermsComponent, {
      width: "700px",
      height: "auto",
      data: { confirmTerms: this.confirmTerms, user: res },
    });

    if (res.role == "APPLICANT") {
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.authService
            .localApplicantSignUp({
              ...this.remoteUser,
              agreed: true,
              tk: this.tk,
            })
            .subscribe(
              (res) => {
                this.authService.progressBarActive.next(true);
                if (this.authService.redirectURL) {
                  this.router.navigateByUrl(this.authService.redirectURL);
                } else
                  this.router.navigate([this.authService.defaultNavigationURL]);
              },
              (err) => console.log(err)
            );
        }
      });
    } else {
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.authService
            .localEmployerSignUp({ ...this.remoteUser, ...result, tk: this.tk })
            .subscribe(
              (res) => {
                this.authService.progressBarActive.next(true);
                if (this.authService.redirectURL) {
                  this.router.navigateByUrl(this.authService.redirectURL);
                } else
                  this.router.navigate([this.authService.defaultNavigationURL]);
              },
              (err) => console.log(err)
            );
        }
      });
    }
  }
}
