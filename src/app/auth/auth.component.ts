import { Router } from "@angular/router";
// import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  today = new Date().getFullYear();
  version = environment.version;
  progressBarActive = true;
  signUpRoute = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.router.url.toString().includes("/common-signup")) {
      this.signUpRoute = "/signup-seller";
    } else if (this.router.url.toString().includes("/signup-seller")) {
      this.signUpRoute = "/common-signup";
    } else {
      this.signUpRoute = "";
    }
    this.router.events.subscribe((url: any) => {
      if (url.url && url.url.includes("/common-signup")) {
        this.signUpRoute = "/signup-seller";
      } else if (url.url && url.url.includes("/signup-seller")) {
        this.signUpRoute = "/common-signup";
      }
    });
    this.authService.progressBarActive.subscribe((value) => {
      this.progressBarActive = value;
    });
  }
}
