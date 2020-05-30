import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, EMPTY, of } from "rxjs";
import { UserService } from "./user.service";
import { RevenuRprt } from "../model/revenuRprt";
import { mergeMap } from "rxjs/operators";

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
