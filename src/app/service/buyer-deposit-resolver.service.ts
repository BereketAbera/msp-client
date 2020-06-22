import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Deposit } from "../model/deposit";
import { UserService } from "./user.service";

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
