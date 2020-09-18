import { UserService } from "./service/user.service";
import { AuthService } from "./service/auth.service";
import { Component } from "@angular/core";
import { VERSION } from "@angular/flex-layout";
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "MSP";
  version = VERSION.full;

  routing: boolean;
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    if (this.authService.isSellerLoggedIn()) {
      this.userService.getSellerProfile().subscribe((res) => {
        // console.log(res);
        this.authService.setStatus(res.status);
        this.router.navigate(["/"]);
      });
    }
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.routing = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.routing = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
