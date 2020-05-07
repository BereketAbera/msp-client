import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
var BuyerTransactionsDataSource = /** @class */ (function () {
    function BuyerTransactionsDataSource(transactionService) {
        this.transactionService = transactionService;
        this.productsSubject = new BehaviorSubject([]);
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    BuyerTransactionsDataSource.prototype.loadTransactions = function (usrId, filter, sortDirection, pageIndex, pageSize) {
        var _this = this;
        this.loadingSubject.next(true);
        this.transactionService.listBuyerTransactions(usrId, filter, sortDirection, pageIndex, pageSize).pipe(catchError(function () { return of([]); }), finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (buyerTrnsct) {
            _this.count = _this.transactionService.countSubject.value;
            _this.productsSubject.next(buyerTrnsct);
        });
    };
    BuyerTransactionsDataSource.prototype.connect = function (collectionViewer) {
        // console.log("Connecting data source");
        return this.productsSubject.asObservable();
    };
    BuyerTransactionsDataSource.prototype.disconnect = function (collectionViewer) {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    };
    return BuyerTransactionsDataSource;
}());
export { BuyerTransactionsDataSource };
//# sourceMappingURL=buyer-transactions-data-source.service.js.map