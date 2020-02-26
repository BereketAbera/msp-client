import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
var BannerCtrlDirective = /** @class */ (function () {
    function BannerCtrlDirective() {
        this.selectedIndex = 0;
        this.selectedIndexEmitter = new EventEmitter();
        this.actualIndexEmitter = new EventEmitter();
        this.destroyed$ = new Subject();
        this.resetTimer$ = new Subject();
    }
    BannerCtrlDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.resetTimer$
            .startWith(null)
            .takeUntil(this.destroyed$)
            .switchMap(function (t) { return timer(5000, 5000); })
            .subscribe(function () { return _this.next(); });
    };
    BannerCtrlDirective.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
    };
    BannerCtrlDirective.prototype.actualIndex = function () {
        var len = this.itemsLength;
        // negative still return the right index
        return ((this.selectedIndex % len) + len) % len;
    };
    BannerCtrlDirective.prototype.setIndex = function (index) {
        this.selectedIndex = index;
        this.actualIndexEmitter.next(this.actualIndex());
        this.selectedIndexEmitter.next(index);
        this.resetTimer$.next();
    };
    BannerCtrlDirective.prototype.previous = function () {
        --this.selectedIndex;
        this.actualIndexEmitter.next(this.actualIndex());
        this.selectedIndexEmitter.next(this.selectedIndex);
        this.resetTimer$.next();
    };
    BannerCtrlDirective.prototype.next = function () {
        ++this.selectedIndex;
        this.actualIndexEmitter.next(this.actualIndex());
        this.selectedIndexEmitter.next(this.selectedIndex);
        this.resetTimer$.next();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], BannerCtrlDirective.prototype, "itemsLength", void 0);
    tslib_1.__decorate([
        Output('selectedIndex'),
        tslib_1.__metadata("design:type", Object)
    ], BannerCtrlDirective.prototype, "selectedIndexEmitter", void 0);
    tslib_1.__decorate([
        Output('actualIndex'),
        tslib_1.__metadata("design:type", Object)
    ], BannerCtrlDirective.prototype, "actualIndexEmitter", void 0);
    BannerCtrlDirective = tslib_1.__decorate([
        Directive({
            selector: '[bannerCtrl]',
            exportAs: 'bannerCtrl'
        })
    ], BannerCtrlDirective);
    return BannerCtrlDirective;
}());
export { BannerCtrlDirective };
//# sourceMappingURL=banner-ctrl.directive.js.map