import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { TransactionService } from "./transaction.service";
import { Transaction } from "../model/transaction";

@Injectable({
  providedIn: "root",
})
export class OrdersResolverService implements Resolve<Transaction[]> {
  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Transaction[]> | Observable<never> {
    this.authService.progressBarActive.next(true);
    return this.transactionService.listTransactions(1).pipe(
      mergeMap((transactions) => {
        if (transactions) {
          this.authService.progressBarActive.next(false);
          return of(transactions);
        } else {
          this.authService.progressBarActive.next(false);
          this.router.navigate(["/"]);
          return EMPTY;
        }
      })
    );
  }
}
