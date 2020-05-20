import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { UserService } from "./user.service";
import { Balance } from "../model/balance";

@Injectable()
export class BalanceResolverService implements Resolve<Balance> {
  constructor(private userSerice: UserService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Balance> | Observable<never> {
    return this.userSerice.getBalance();
  }
}
