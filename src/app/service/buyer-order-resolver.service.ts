import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Transaction } from "../model/transaction";
import { UserService } from "./user.service";

@Injectable()
export class BuyerOrderResolverService implements Resolve<Transaction> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Transaction> | Observable<never> {
    let transactionId = route.paramMap.get("id");
    return this.userService.getTransaction(transactionId).pipe(
      mergeMap((transaction) => {
        if (transaction) {
          return of(transaction);
        } else {
          // id not found
          this.router.navigate(["./"]);
          return EMPTY;
        }
      })
    );
  }
}
