import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, finalize } from "rxjs/operators";
import { DailySale } from "../model/daily-sale";
import { UserService } from "./user.service";

export class DailySalesDataSource implements DataSource<DailySale> {
  private productsSubject = new BehaviorSubject<DailySale[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public count: number;
  constructor(private userService: UserService) {}
  loadTransactions(
    fltrDate: Date,
    fltrEnd: Date,
    pageNumber: Number,
    pageSize: Number
  ) {
    this.loadingSubject.next(true);

    this.userService
      .getSellerDailySlsSmry(fltrDate, fltrEnd, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((buyerTrnsct) => {
        // console.log(buyerTrnsct, "sa");
        this.count = this.userService.countSubject.value;
        this.productsSubject.next(buyerTrnsct);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<DailySale[]> {
    // console.log("Connecting data source");
    return this.productsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productsSubject.complete();
    this.loadingSubject.complete();
  }
}
