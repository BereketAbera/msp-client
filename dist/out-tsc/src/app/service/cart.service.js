import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from '../../environments/environment';
import * as moment from 'moment';
var reserveApi = environment.APIEndpoint + "rsrvordr";
var CartService = /** @class */ (function () {
    function CartService(http) {
        this.http = http;
        this.countSubject = new BehaviorSubject(0);
        this.navbarCartCount = 0;
    }
    CartService.prototype.addToCart = function (rsrvPrdct) {
        return this.http.post(reserveApi + '/order', rsrvPrdct).pipe(catchError(this.handleError));
    };
    CartService.prototype.removeFromCart = function (rsrvPrdct) {
        return this.http.post(reserveApi + '/rmvrsrvdtl', rsrvPrdct).pipe(catchError(this.handleError));
    };
    CartService.prototype.isCartExpired = function () {
        var order = JSON.parse(localStorage.getItem('msp_cart_items'));
        if (order) {
            if (order.createdAt) {
                var xy = moment(order.createdAt);
                if (moment(order.createdAt).isBefore(moment().subtract(9, 'minutes')))
                    return true;
            }
            else
                return false;
        }
        return false;
    };
    CartService.prototype.addToLocalCart = function (data, guid) {
        var a;
        a = JSON.parse(localStorage.getItem('msp_cart_items')) || { 'products': [] };
        if (!a.guid) {
            a.guid = guid;
            a.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
        }
        var idx = a.products.findIndex(function (element) {
            if (element.prdid == data.prdid)
                return true;
        });
        if (idx < 0)
            a.products.push(data);
        else
            a.products[idx] = data;
        localStorage.setItem('msp_cart_items', JSON.stringify(a));
    };
    // Removing cart from local
    CartService.prototype.removeLocalCartProduct = function (product) {
        var order = JSON.parse(localStorage.getItem('msp_cart_items'));
        for (var i = 0; i < order.products.length; i++) {
            if (order.products[i].prdid === product.prdid) {
                order.products.splice(i, 1);
                break;
            }
        }
        // ReAdding the products after remove
        if (order.products.length > 0)
            localStorage.setItem('msp_cart_items', JSON.stringify(order));
        else
            localStorage.removeItem('msp_cart_items');
        this.calculateLocalCartProdCounts();
    };
    CartService.prototype.resetCart = function () {
        localStorage.removeItem('msp_cart_items');
    };
    // Fetching Locat CartsProduct
    CartService.prototype.getLocalCartProducts = function () {
        var order = JSON.parse(localStorage.getItem('msp_cart_items'));
        if (order)
            return order.products;
        else
            return [];
    };
    CartService.prototype.getCartGuid = function () {
        var order = JSON.parse(localStorage.getItem('msp_cart_items'));
        if (order)
            return order.guid;
        else
            return "";
    };
    // returning LocalCarts Product Count
    CartService.prototype.calculateLocalCartProdCounts = function () {
        this.navbarCartCount = this.getLocalCartProducts().length;
    };
    CartService.prototype.handleError = function (error) {
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
    CartService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CartService);
    return CartService;
}());
export { CartService };
//# sourceMappingURL=cart.service.js.map