import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, finalize } from "rxjs/operators";
import { BuyerTransaction } from "../model/buyer-transaction";
import { AuthService } from "./auth.service";
import { TransactionService } from "./transaction.service";

export class BuyerTransactionsDataSource
  implements DataSource<BuyerTransaction> {
  private productsSubject = new BehaviorSubject<BuyerTransaction[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public count: number;
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}
  loadTransactions(
    usrId: number,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.authService.progressBarActive.next(true);
    this.loadingSubject.next(true);

    this.transactionService
      .listBuyerTransactions(usrId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => {
          this.authService.progressBarActive.next(false);
          return of([]);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((buyerTrnsct) => {
        this.authService.progressBarActive.next(false);
        this.count = this.transactionService.countSubject.value;
        this.productsSubject.next(buyerTrnsct);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<BuyerTransaction[]> {
    // console.log("Connecting data source");
    return this.productsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productsSubject.complete();
    this.loadingSubject.complete();
  }
}
