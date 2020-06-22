import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

@Injectable()
export class ProfileResolverService {
  constructor(
    private userSerice: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    return this.userSerice.getSellerProfile().pipe(
      mergeMap((profile) => {
        if (profile) {
          this.authService.progressBarActive.next(false);
          return of(profile);
        } else {
          // id not found
          this.authService.progressBarActive.next(false);
          return EMPTY;
        }
      })
    );
  }
}
