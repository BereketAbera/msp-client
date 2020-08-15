import { SellerStaffService } from "src/app/service/seller-staff.service";
import { mapRoutes } from "./mapRoutes";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./service/auth.service";
import { ThrowStmt } from "@angular/compiler";

@Injectable({
  providedIn: "root",
})
export class StafferGuard implements CanActivate {
  user_features = null;
  alreadyRouted = false;
  accessibleRoute = null;
  isUsed = false;

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
    if (
      this.authService.isSellerLoggedIn() &&
      (this.authService.getRole() == "SELLER" ||
        this.authService.getRole() == "SELLER_STAFF")
    ) {
      if (this.authService.getRole() == "SELLER") {
        return true;
      } else {
        let routed = this.routeToAccessible(url);
        return !!routed;
      }
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  routeToAccessible(url) {
    let user = this.authService.getUser();
    if (user) {
      let found = false;
      if (!this.user_features || this.authService.newUser) {
        return !!this.sellerStaffService.getUserFeatures(user.id).subscribe(
          (response) => {
            this.user_features = response.features;
            if (this.user_features.length == 0 || this.alreadyRouted) {
              this.router.navigate(["/tlgu-slr/access_denied"]);
              return false;
            } else {
              found = this.checkUserFeatures(url);
              if (!found) {
                let route = this.getAccessibleRoute(this.user_features[0]);
                // console.log(route);
                this.accessibleRoute = route;
              } else {
                return true;
              }
            }
          },
          (err) => console.log(err)
        );
      } else {
        if (this.user_features.length == 0) {
          this.router.navigate(["/tlgu-slr/access_denied"]);
          return false;
        } else {
          found = this.checkUserFeatures(url);
          if (!found) {
            let route = this.getAccessibleRoute(this.user_features[0]);
            // console.log(route);
            this.router.navigateByUrl(route);
            return false;
          } else {
            return true;
          }
        }
      }
    } else {
      this.router.navigate(["/login"]);
    }
  }

  checkUserFeatures(url) {
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
    // console.log(mapRoutes);
    keys.map((key) => {
      if (mapRoutes[key] == feature.description) {
        url = key;
      }
    });
    return url;
  }
}
