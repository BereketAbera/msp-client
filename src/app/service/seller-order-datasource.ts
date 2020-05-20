import { AuthService } from "./auth.service";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Transaction } from "../model/transaction";
import { TransactionService } from "./transaction.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";

export class SellerOrderDataSource implements DataSource<Transaction> {
  private productsSubject = new BehaviorSubject<Transaction[]>([]);

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
      .listSellersOrders(usrId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => {
          this.authService.progressBarActive.next(false);
          return of([]);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((products) => {
        // console.log(products);
        this.authService.progressBarActive.next(false);
        this.count = this.transactionService.countSubject.value;
        this.productsSubject.next(products);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Transaction[]> {
    //console.log("Connecting data source");
    return this.productsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productsSubject.complete();
    this.loadingSubject.complete();
  }
}
