import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { State } from "../model/state";
import { mergeMap } from "rxjs/operators";
import { SellerStaffService } from "./seller-staff.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class StaffResolverService {
  constructor(
    private sellerStaffService: SellerStaffService,
    private router: Router,
    public authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<State[]> | Observable<never> {
    this.authService.progressBarActive.next(true);
    return this.sellerStaffService.getStaffs(1).pipe(
      mergeMap((staff) => {
        if (staff) {
          this.authService.progressBarActive.next(false);
          return of(staff);
        } else {
          this.authService.progressBarActive.next(false);
          return EMPTY;
        }
      })
    );
  }
}
