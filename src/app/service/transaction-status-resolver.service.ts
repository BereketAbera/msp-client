import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { TransactionStatus } from "../model/transactionStatus";
import { TransactionService } from "./transaction.service";

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
