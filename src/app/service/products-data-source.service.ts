import { AuthService } from "./auth.service";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Product } from "../model/product";
import { ProductService } from "./product.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";

export class ProductsDataSource implements DataSource<Product> {
  private productsSubject = new BehaviorSubject<Product[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public count: number;
  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}
  loadProducts(
    usrId: number,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.authService.progressBarActive.next(true);
    this.loadingSubject.next(true);
    this.productService
      .listProductsSeller(usrId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => {
          this.authService.progressBarActive.next(true);
          return of([]);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((products) => {
        this.authService.progressBarActive.next(false);
        this.count = this.productService.countSubject.value;
        this.productsSubject.next(products);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    //console.log("Connecting data source");
    return this.productsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productsSubject.complete();
    this.loadingSubject.complete();
  }
}
