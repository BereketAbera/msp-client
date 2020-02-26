import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
var DailySalesDataSource = /** @class */ (function () {
    function DailySalesDataSource(userService) {
        this.userService = userService;
        this.productsSubject = new BehaviorSubject([]);
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    DailySalesDataSource.prototype.loadTransactions = function (fltrDate) {
        var _this = this;
        this.loadingSubject.next(true);
        this.userService.getSellerDailySlsSmry(fltrDate).pipe(catchError(function () { return of([]); }), finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (buyerTrnsct) {
            _this.count = _this.userService.countSubject.value;
            _this.productsSubject.next(buyerTrnsct);
        });
    };
    DailySalesDataSource.prototype.connect = function (collectionViewer) {
        console.log("Connecting data source");
        return this.productsSubject.asObservable();
    };
    DailySalesDataSource.prototype.disconnect = function (collectionViewer) {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    };
    return DailySalesDataSource;
}());
export { DailySalesDataSource };
//# sourceMappingURL=daily-sales-data-source.service.js.map