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
import { AuthService } from "./auth.service";
import { TransactionService } from "./transaction.service";

@Injectable()
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
