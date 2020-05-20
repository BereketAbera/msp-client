import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Product } from "../model/product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs/Subscription";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AuthService } from "../service/auth.service";
import { catchError, finalize, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";

export class FeaturedDataSource extends DataSource<Product | undefined> {
  private length = 6;
  private pageSize = 5;
  private cachedData = Array.from<Product>({ length: this.length });
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<(Product | undefined)[]>(
    this.cachedData
  );
  private subscription = new Subscription();

  private isEndOfProduct = false;

  public count: number = 0;
  public subCatagoryId: number | string = 0;
  constructor(
    private authService: AuthService,
    private transactionService: ProductService,
    private catagoryId: number | string
  ) {
    super();
    this.subCatagoryId = catagoryId;
  }
  loadTransactions(
    distance: number,
    subCatagoryId: number | string,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {}
  connect(
    collectionViewer: CollectionViewer
  ): Observable<(Product | undefined)[]> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const startPage = this.getPageForIndex(range.start);
        const endPage = this.getPageForIndex(range.end - 1);

        for (let i = startPage; i <= endPage; i++) {
          this.fetchPage(i);
        }
      })
    );
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number) {
    if (this.fetchedPages.has(page) || this.isEndOfProduct) {
      return;
    }
    //this.loadTransactions(0,'', 'DESC', page, this.pageSize);
    // Use `setTimeout` to simulate fetching data from server.
  }
}
