import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../service/user.service";
import { RegistrationCompleteComponent } from "../registration-complete/registration-complete.component";

@Component({
  selector: "app-new-password",
  templateUrl: "./new-password.component.html",
  styleUrls: ["./new-password.component.scss"],
})
export class NewPasswordComponent implements OnInit {
  @Output() registeredByr: EventEmitter<any> = new EventEmitter();
  hide = true;
  errors;
  token = "";
  showError: boolean = false;
  passwordRestForm = this.fb.group({
    token: [this.token],
    password: [
      "",
      [
        Validators.required,
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/),
      ],
    ],
    confirmPassword: ["", Validators.required],
  });

  constructor(
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  close() {
    this.showError = false;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      // console.log("this is test"); // {order: "popular"}

      this.token = params.tk;
      // console.log(this.token); // popular

      this.router.navigate["/invtkn"];
    });
  }
  onSubmit() {
    return this.userService
      .registerUser(this.passwordRestForm.value)
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
  }
  openTerms() {}
  openPrivacy() {}
}
