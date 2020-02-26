import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
var ProductsDataSource = /** @class */ (function () {
    function ProductsDataSource(productService) {
        this.productService = productService;
        this.productsSubject = new BehaviorSubject([]);
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    ProductsDataSource.prototype.loadProducts = function (usrId, filter, sortDirection, pageIndex, pageSize) {
        var _this = this;
        this.loadingSubject.next(true);
        this.productService.listProductsSeller(usrId, filter, sortDirection, pageIndex, pageSize).pipe(catchError(function () { return of([]); }), finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (products) {
            _this.count = _this.productService.countSubject.value;
            _this.productsSubject.next(products);
        });
    };
    ProductsDataSource.prototype.connect = function (collectionViewer) {
        console.log("Connecting data source");
        return this.productsSubject.asObservable();
    };
    ProductsDataSource.prototype.disconnect = function (collectionViewer) {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    };
    return ProductsDataSource;
}());
export { ProductsDataSource };
//# sourceMappingURL=products-data-source.service.js.map