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
import { TransactionService } from "./transaction.service";

@Injectable()
export class TransactionResolverService implements Resolve<Transaction> {
  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Transaction> | Observable<never> {
    let transactionId = route.paramMap.get("id");
    return this.transactionService.getTransaction(transactionId).pipe(
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
