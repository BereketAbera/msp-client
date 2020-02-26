import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from '../../environments/environment';
import * as moment_ from 'moment';
var moment = moment_;
var productApi = environment.APIEndpoint + "products";
var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
        this.countSubject = new BehaviorSubject(0);
    }
    ProductService.prototype.createProduct = function (product) {
        return this.http.post(productApi, product).pipe(catchError(this.handleError));
    };
    ProductService.prototype.removeProduct = function (productId) {
        return this.http.delete(productApi + "/" + productId).pipe(map(function (product) {
            return product;
        }), catchError(this.handleError));
    };
    ProductService.prototype.getShopInfo = function (prdId, lat, lng) {
        return this.http.get(productApi + "/shplctn", {
            params: new HttpParams()
                .set('prdId', prdId.toString())
                .set('lat', lat.toString())
                .set('lng', lng.toString())
        }).pipe(map(function (res) {
            return res;
        }), catchError(this.handleError));
    };
    ProductService.prototype.listProductsSeller = function (usrId, filter, sortOrder, pageNumber, pageSize) {
        var _this = this;
        if (filter === void 0) { filter = ''; }
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 5; }
        return this.http.get(productApi + "/admin/seller", {
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
    ProductService.prototype.listProductsHomeA = function (filter, sortOrder, pageNumber, pageSize) {
        var _this = this;
        if (filter === void 0) { filter = ''; }
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 5; }
        return this.http.get(productApi + "/home", {
            params: new HttpParams()
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(map(function (res) {
            _this.countSubject.next(res['count']);
            return res['rows'];
        }), catchError(this.handleError));
    };
    ProductService.prototype.listProductsHome = function () {
        var _this = this;
        return this.http.get(productApi).pipe(map(function (res) {
            _this.countSubject.next(res['count']);
            return res['rows'];
        }), catchError(this.handleError));
    };
    ProductService.prototype.getProduct = function (id) {
        return this.http.get(productApi + "/public/" + id).pipe(map(function (product) {
            return product;
        }), catchError(this.handleError));
    };
    ProductService.prototype.getMarkup = function () {
        return this.http.get(productApi + "/tlgumrkup").pipe(map(function (markup) {
            return +markup['talguuMarkup'];
        }), catchError(this.handleError));
    };
    ProductService.prototype.getMSPMarkup = function (productId) {
        return this.http.get(productApi + "/mspmrkup/" + productId).pipe(map(function (markup) {
            return { mspMarkup: +markup['mspMarkup'] };
        }), catchError(this.handleError));
    };
    ProductService.prototype.handleError = function (error) {
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
    ;
    ProductService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ProductService);
    return ProductService;
}());
export { ProductService };
//# sourceMappingURL=product.service.js.map