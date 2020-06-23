import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./service/auth.service";

@Injectable({
  providedIn: "root",
})
export class StafferGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.authService.isSellerLoggedIn() &&
      (this.authService.getRole() == "STAFF" ||
        this.authService.getRole() == "SELLER_STAFF")
    ) {
      if (this.authService.getRole() == "STAFF") {
        return true;
      } else {
        let routed = this.routeToAccessible();
        return routed;
      }
    } else {
      this.router.navigate(["/products"]);
      return false;
    }
  }

  routeToAccessible() {
    return false;
  }
}
