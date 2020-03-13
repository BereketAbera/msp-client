import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { TransactionService } from "./transaction.service";
import { Transaction } from "../model/transaction";

@Injectable({
  providedIn: "root"
})
export class OrdersResolverService implements Resolve<Transaction[]> {
  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Transaction[]> | Observable<never> {
    return this.transactionService.listTransactions(1).pipe(
      mergeMap(transactions => {
        if (transactions) {
          return of(transactions);
        } else {
          // id not found
          this.router.navigate(["/"]);
          return EMPTY;
        }
      })
    );
  }
}
