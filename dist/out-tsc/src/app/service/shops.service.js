import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from '../../environments/environment';
var shopCreateApi = environment.APIEndpoint + "shops";
var ShopsService = /** @class */ (function () {
    function ShopsService(http) {
        this.http = http;
        this.countSubject = new BehaviorSubject(0);
    }
    ShopsService.prototype.createShope = function (shop) {
        return this.http.post(shopCreateApi, shop).pipe(catchError(this.handleError));
    };
    ShopsService.prototype.listShopsForProduct = function () {
        var _this = this;
        return this.http.get(shopCreateApi + "/admin").pipe(map(function (res) {
            _this.countSubject.next(res['count']);
            return res['rows'];
        }), catchError(this.handleError));
    };
    ShopsService.prototype.listShops = function (usrId, filter, sortOrder, pageNumber, pageSize) {
        var _this = this;
        if (filter === void 0) { filter = ''; }
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 3; }
        return this.http.get(shopCreateApi, {
            params: new HttpParams()
                .set('usrId', usrId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(map(function (res) {
            _this.countSubject.next(res['count']);
            return res['rows'];
        }), catchError(this.handleError));
    };
    ShopsService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
    ShopsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ShopsService);
    return ShopsService;
}());
export { ShopsService };
//# sourceMappingURL=shops.service.js.map