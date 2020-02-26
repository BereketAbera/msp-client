import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
var TransactionsDataSource = /** @class */ (function () {
    function TransactionsDataSource(transactionService) {
        this.transactionService = transactionService;
        this.productsSubject = new BehaviorSubject([]);
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    TransactionsDataSource.prototype.loadTransactions = function (usrId, filter, sortDirection, pageIndex, pageSize) {
        var _this = this;
        this.loadingSubject.next(true);
        this.transactionService.listTransactions(usrId, filter, sortDirection, pageIndex, pageSize).pipe(catchError(function () { return of([]); }), finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (products) {
            _this.count = _this.transactionService.countSubject.value;
            _this.productsSubject.next(products);
        });
    };
    TransactionsDataSource.prototype.connect = function () {
        console.log("Connecting data source");
        return this.productsSubject.asObservable();
    };
    TransactionsDataSource.prototype.disconnect = function (collectionViewer) {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    };
    return TransactionsDataSource;
}());
export { TransactionsDataSource };
//# sourceMappingURL=transaction-data-source.service.js.map