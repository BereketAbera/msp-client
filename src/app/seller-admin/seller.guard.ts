import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { mapRoutes } from "../mapRoutes";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { SellerStaffService } from "../service/seller-staff.service";

@Injectable({
  providedIn: "root"
})
export class SellerGuard implements CanActivate {
  user_features = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private sellerStaffService: SellerStaffService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    return this.manageUserRouteAccess(url);
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
  manageUserRouteAccess(url: string): boolean {
    let role = this.authService.getRole();
    if (this.authService.isSellerLoggedIn()) {
      if (role == "SELLER") {
        return true;
      }
      let user = this.authService.getUser();
      if (user) {
        if (!this.user_features) {
          return !!this.sellerStaffService.getUserFeatures(user.id).subscribe(
            response => {
              this.user_features = response.features;
              return this.checkUserFeatures(url);
            },
            err => console.log(err)
          );
        } else {
          return this.checkUserFeatures(url);
        }
      } else {
        this.router.navigate(["/login/seller"]);
      }
    } else if (this.authService.isLoggedIn()) {
      this.router.navigate([this.authService.defaultNavigationURL]);
      return false;
    } else {
      this.authService.redirectURL = url;
      this.router.navigate(["/login/seller"]);
      return false;
    }
    // Store the attempted URL for redirecting
  }

  checkUserFeatures(url) {
    let newUrl = this.refactorUrl(url);
    let found = false;
    this.user_features.map(uf => {
      if (mapRoutes[newUrl] == uf.description) {
        found = true;
        return;
      }
    });
    return found;
  }

  refactorUrl(url) {
    console.log(url);
    if (/\d/.test(url)) {
      let x = url.split("/");
      url = url.replace(x[x.length - 1], "id");
      return url;
    }

    return url;
  }
}
