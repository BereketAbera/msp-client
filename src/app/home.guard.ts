import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./service/auth.service";

@Injectable({
  providedIn: "root"
})
export class HomeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isSellerLoggedIn()) {
      console.log("seller sellere");
      this.router.navigate(["/tlgu-slr"]);
      return false;
    }
    return true;
  }
}
