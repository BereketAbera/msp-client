import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
var RefersDataSource = /** @class */ (function () {
    function RefersDataSource(userService) {
        this.userService = userService;
        this.productsSubject = new BehaviorSubject([]);
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    RefersDataSource.prototype.loadRefers = function (filter, sortDirection, pageIndex, pageSize) {
        var _this = this;
        this.loadingSubject.next(true);
        this.userService.listRefers(filter, sortDirection, pageIndex, pageSize).pipe(catchError(function () { return of([]); }), finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (products) {
            _this.count = _this.userService.countSubject.value;
            _this.productsSubject.next(products);
        });
    };
    RefersDataSource.prototype.connect = function (collectionViewer) {
        // console.log("Connecting data source");
        return this.productsSubject.asObservable();
    };
    RefersDataSource.prototype.disconnect = function (collectionViewer) {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    };
    return RefersDataSource;
}());
export { RefersDataSource };
//# sourceMappingURL=refers-data-source.service.js.map