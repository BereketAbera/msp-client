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
export class SellerOrderResolverService implements Resolve<Transaction> {
  constructor(
    private transactService: TransactionService,
    private router: Router,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Transaction> | Observable<never> {
    let transactionId = route.paramMap.get("id");
    this.authService.progressBarActive.next(true);
    return this.transactService.getSellerTransaction(transactionId).pipe(
      mergeMap((transaction) => {
        if (transaction) {
          this.authService.progressBarActive.next(false);
          return of(transaction);
        } else {
          // id not
          this.authService.progressBarActive.next(false);
          this.router.navigate(["./"]);
          return EMPTY;
        }
      })
    );
  }
}
