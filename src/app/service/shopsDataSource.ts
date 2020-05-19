import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Shop } from "../model/shop";
import { ShopsService } from "./shops.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { AuthService } from "./auth.service";

export class ShopsDataSource implements DataSource<Shop> {
  private shopsSubject = new BehaviorSubject<Shop[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public count: number;
  constructor(
    private shopService: ShopsService,
    private authService: AuthService
  ) {}

  loadShops(
    usrId: number,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.authService.progressBarActive.next(true);
    this.loadingSubject.next(true);
    this.shopService
      .listShops(usrId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => {
          this.authService.progressBarActive.next(false);
          return of([]);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((shops) => {
        this.authService.progressBarActive.next(false);
        this.count = this.shopService.countSubject.value;
        this.shopsSubject.next(shops);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Shop[]> {
    //console.log("Connecting data source");
    return this.shopsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.shopsSubject.complete();
    this.loadingSubject.complete();
  }
}
