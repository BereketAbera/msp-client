import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, finalize } from "rxjs/operators";
import { Product } from "../model/product";
import { AuthService } from "./auth.service";
import { ProductService } from "./product.service";

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
    sortBy: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    // console.log(
    // `userId=${usrId}, filter=${filter}, sortBy=${sortBy}, sortDirection=${sortDirection}, pageIndex=${pageIndex}, pageSize=${pageSize}`
    // );
    this.authService.progressBarActive.next(true);
    this.loadingSubject.next(true);
    this.productService
      .listProductsSeller(
        usrId,
        filter,
        sortBy,
        sortDirection,
        pageIndex,
        pageSize
      )
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
