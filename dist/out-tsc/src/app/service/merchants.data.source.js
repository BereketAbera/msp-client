import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
var MerchantsDataSource = /** @class */ (function () {
    function MerchantsDataSource(userService) {
        this.userService = userService;
        this.productsSubject = new BehaviorSubject([]);
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    MerchantsDataSource.prototype.loadMerchants = function (usrId, filter, sortDirection, pageIndex, pageSize) {
        var _this = this;
        this.loadingSubject.next(true);
        this.userService.listMerchants(usrId, filter, sortDirection, pageIndex, pageSize).pipe(catchError(function () { return of([]); }), finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (products) {
            _this.count = _this.userService.countSubject.value;
            _this.productsSubject.next(products);
        });
    };
    MerchantsDataSource.prototype.connect = function (collectionViewer) {
        // console.log("Connecting data source");
        return this.productsSubject.asObservable();
    };
    MerchantsDataSource.prototype.disconnect = function (collectionViewer) {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    };
    return MerchantsDataSource;
}());
export { MerchantsDataSource };
//# sourceMappingURL=merchants.data.source.js.map