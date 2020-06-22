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
export class UserProfileResolverService {
  constructor(
    private userSerice: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    return this.userSerice.getUserProfile().pipe(
      mergeMap((profile) => {
        if (profile) {
          return of(profile);
        } else {
          // id not found
          return EMPTY;
        }
      })
    );
  }
}
