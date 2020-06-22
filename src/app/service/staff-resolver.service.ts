import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { State } from "../model/state";
import { AuthService } from "./auth.service";
import { SellerStaffService } from "./seller-staff.service";

@Injectable()
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
