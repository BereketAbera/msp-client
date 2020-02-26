import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
var OrderDataSource = /** @class */ (function () {
    function OrderDataSource(transactionService) {
        this.transactionService = transactionService;
        this.productsSubject = new BehaviorSubject([]);
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    OrderDataSource.prototype.loadTransactions = function (usrId, filter, sortDirection, pageIndex, pageSize) {
        var _this = this;
        this.loadingSubject.next(true);
        this.transactionService.listOrders(usrId, filter, sortDirection, pageIndex, pageSize).pipe(catchError(function () { return of([]); }), finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (products) {
            _this.count = _this.transactionService.countSubject.value;
            _this.productsSubject.next(products);
        });
    };
    OrderDataSource.prototype.connect = function (collectionViewer) {
        console.log("Connecting data source");
        return this.productsSubject.asObservable();
    };
    OrderDataSource.prototype.disconnect = function (collectionViewer) {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    };
    return OrderDataSource;
}());
export { OrderDataSource };
//# sourceMappingURL=order-data-source.service.js.map