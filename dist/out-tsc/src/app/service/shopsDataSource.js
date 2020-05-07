import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
var ShopsDataSource = /** @class */ (function () {
    function ShopsDataSource(shopService) {
        this.shopService = shopService;
        this.shopsSubject = new BehaviorSubject([]);
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    ShopsDataSource.prototype.loadShops = function (usrId, filter, sortDirection, pageIndex, pageSize) {
        var _this = this;
        this.loadingSubject.next(true);
        this.shopService.listShops(usrId, filter, sortDirection, pageIndex, pageSize).pipe(catchError(function () { return of([]); }), finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (shops) {
            _this.count = _this.shopService.countSubject.value;
            _this.shopsSubject.next(shops);
        });
    };
    ShopsDataSource.prototype.connect = function (collectionViewer) {
        // console.log("Connecting data source");
        return this.shopsSubject.asObservable();
    };
    ShopsDataSource.prototype.disconnect = function (collectionViewer) {
        this.shopsSubject.complete();
        this.loadingSubject.complete();
    };
    return ShopsDataSource;
}());
export { ShopsDataSource };
//# sourceMappingURL=shopsDataSource.js.map