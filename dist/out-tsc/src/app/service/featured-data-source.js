import * as tslib_1 from "tslib";
import { DataSource } from "@angular/cdk/collections";
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
var FeaturedDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(FeaturedDataSource, _super);
    function FeaturedDataSource(transactionService) {
        var _this = _super.call(this) || this;
        _this.transactionService = transactionService;
        _this.length = 6;
        _this.pageSize = 5;
        _this.cachedData = Array.from({ length: _this.length });
        _this.fetchedPages = new Set();
        _this.dataStream = new BehaviorSubject(_this.cachedData);
        _this.subscription = new Subscription();
        _this.isEndOfProduct = false;
        _this.count = 0;
        return _this;
    }
    ;
    FeaturedDataSource.prototype.loadTransactions = function (filter, sortDirection, pageIndex, pageSize) {
        var _this = this;
        this.transactionService.listProductsHomeA(filter, sortDirection, pageIndex, pageSize).subscribe(function (products) {
            var _a, _b;
            if (products && products.length > 0) {
                _this.count += products.length;
                //this.cachedData = Array.from<Product>({ length: this.count});
                _this.fetchedPages.add(pageIndex);
                if (_this.count <= 5)
                    (_a = _this.cachedData).splice.apply(_a, [pageIndex * products.length, products.length].concat(products));
                else
                    (_b = _this.cachedData).splice.apply(_b, [_this.cachedData.length, 0].concat(products));
            }
            else {
                _this.isEndOfProduct = true;
                _this.cachedData.splice(15);
            }
            _this.dataStream.next(_this.cachedData);
        });
    };
    FeaturedDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        this.subscription.add(collectionViewer.viewChange.subscribe(function (range) {
            var startPage = _this.getPageForIndex(range.start);
            var endPage = _this.getPageForIndex(range.end - 1);
            for (var i = startPage; i <= endPage; i++) {
                _this.fetchPage(i);
            }
        }));
        return this.dataStream;
    };
    FeaturedDataSource.prototype.disconnect = function () {
        this.subscription.unsubscribe();
    };
    FeaturedDataSource.prototype.getPageForIndex = function (index) {
        return Math.floor(index / this.pageSize);
    };
    FeaturedDataSource.prototype.fetchPage = function (page) {
        if (this.fetchedPages.has(page) || this.isEndOfProduct) {
            return;
        }
        this.loadTransactions('', 'DESC', page, this.pageSize);
        // Use `setTimeout` to simulate fetching data from server.
    };
    return FeaturedDataSource;
}(DataSource));
export { FeaturedDataSource };
//# sourceMappingURL=featured-data-source.js.map