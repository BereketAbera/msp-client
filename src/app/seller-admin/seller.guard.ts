import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { mapRoutes } from "../mapRoutes";
import { AuthService } from "../service/auth.service";
import { SellerStaffService } from "../service/seller-staff.service";

@Injectable({
  providedIn: "root",
})
export class SellerGuard implements CanActivate {
  user_features = null;
  alreadyRouted = false;
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
      if (role == "SELLER" || url == "/tlgu-slr/access_denied") {
        return true;
      }
      let user = this.authService.getUser();
      if (user) {
        let found = false;
        if (!this.user_features || this.authService.newUser) {
          return !!this.sellerStaffService.getUserFeatures(user.id).subscribe(
            (response) => {
              this.user_features = response.features;
              found = this.checkUserFeatures(url);
              // console.log(found);
              if (found) {
                return found;
              } else if (
                !this.alreadyRouted &&
                this.user_features.length != 0
              ) {
                let route = this.getAccessibleRoute(this.user_features[0]);
                this.alreadyRouted = true;
                this.router.navigate([route]);
              } else {
                this.authService.progressBarActive.next(false);
                this.router.navigate(["/tlgu-slr/access_denied"]);
              }
            },
            (err) => console.log(err)
          );
        } else {
          found = this.checkUserFeatures(url);
          if (found) {
            return found;
          } else if (!this.alreadyRouted && this.user_features.length != 0) {
            let route = this.getAccessibleRoute(this.user_features[0]);
            this.alreadyRouted = true;
            this.router.navigate([route]);
          } else {
            this.authService.progressBarActive.next(false);
            this.router.navigate(["/tlgu-slr/access_denied"]);
          }
        }
      } else {
        this.router.navigate(["/login"]);
      }
    } else if (this.authService.isLoggedIn()) {
      this.router.navigate([this.authService.defaultNavigationURL]);
      return false;
    } else {
      this.authService.redirectURL = url;
      this.router.navigate(["/login"]);
      return false;
    }
  }

  checkUserFeatures(url) {
    // console.log(url);
    let newUrl = this.refactorUrl(url);
    let found = false;
    this.user_features.map((uf) => {
      if (mapRoutes[newUrl] == uf.description) {
        found = true;
        return;
      }
    });
    return found;
  }

  refactorUrl(url) {
    if (/\d/.test(url)) {
      let x = url.split("/");
      url = url.replace(x[x.length - 1], "id");
      return url;
    }

    return url;
  }

  getAccessibleRoute(feature) {
    let url = "";
    let keys = Object.keys(mapRoutes);
    keys.map((key) => {
      if (mapRoutes[key] == feature.description) {
        url = key;
      }
    });
    return url;
  }
}
