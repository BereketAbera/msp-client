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
import { Deposit } from "../model/deposit";

@Injectable()
export class BuyerDepositResolverService implements Resolve<Deposit> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Deposit> | Observable<never> {
    let transactionId = route.paramMap.get("id");
    return this.userService.getDeposit(transactionId).pipe(
      mergeMap((deposit) => {
        if (deposit) {
          return of(deposit);
        } else {
          // id not found
          this.router.navigate(["./"]);
          return EMPTY;
        }
      })
    );
  }
}
