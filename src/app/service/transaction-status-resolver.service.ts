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
import { TransactionStatus } from "../model/transactionStatus";

@Injectable()
export class TransactionStatusResolverService
  implements Resolve<TransactionStatus> {
  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TransactionStatus> | Observable<never> {
    let transactionId = route.paramMap.get("id");
    return this.transactionService.getTransactionStatus(transactionId).pipe(
      mergeMap((transactionStatus) => {
        if (transactionStatus) {
          return of(transactionStatus);
        } else {
          // id not found
          this.router.navigate(["./"]);
          return EMPTY;
        }
      })
    );
  }
}
