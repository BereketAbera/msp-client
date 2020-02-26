import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { tap, shareReplay, map } from 'rxjs/operators';
var authApi = environment.APIEndpoint + "authenticate";
var pwdResetReqApi = environment.APIEndpoint + "pwdrstrqt";
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this._defaultAdminNav = "./tlgu-admin";
        this._defaultSellerNav = "./tlgu-slr";
        this._defaultBuyerNav = "./tlgu-byr";
        this._defaultNav = "./login";
    }
    AuthService.prototype.login = function (useCredential) {
        var _this = this;
        return this.http.post(authApi, useCredential, { observe: 'response' }).pipe(tap(function (res) {
            if (res.body['success'])
                _this.setSession(res.body);
        }), map(function (res) {
            if (!res.body['success'])
                throw res.body;
        }), shareReplay());
    };
    AuthService.prototype.reqPwdRest = function (email) {
        return this.http.post(pwdResetReqApi, email, { observe: 'response' }).pipe(tap(function (res) {
            if (res.body['success'])
                return res.body;
        }), map(function (res) {
            if (!res.body['success'])
                throw res.body;
        }));
    };
    AuthService.prototype.getMyStatus = function () {
        return localStorage.getItem("status");
    };
    AuthService.prototype.getEmail = function () {
        return localStorage.getItem("email");
    };
    AuthService.prototype.getName = function () {
        return localStorage.getItem("name");
    };
    AuthService.prototype.setSession = function (authResult) {
        var expiresAt = moment().add(authResult.expiresIn, 'second');
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        localStorage.setItem("role", authResult.role);
        localStorage.setItem("status", authResult.status);
        localStorage.setItem("email", authResult.email);
        localStorage.setItem("name", authResult.name);
    };
    AuthService.prototype.logout = function () {
        this.redirectURL = null;
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("role");
        localStorage.removeItem("status");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
    };
    AuthService.prototype.isLoggedIn = function () {
        return moment().isBefore(this.getExpiration());
    };
    AuthService.prototype.isSellerLoggedIn = function () {
        return moment().isBefore(this.getExpiration()) && this.isSeller();
    };
    AuthService.prototype.isBuyerLoggedIn = function () {
        return moment().isBefore(this.getExpiration()) && this.isBuyer();
    };
    AuthService.prototype.isAdminLoggedIn = function () {
        return moment().isBefore(this.getExpiration()) && this.isAdmin();
    };
    AuthService.prototype.isLoggedOut = function () {
        return !this.isLoggedIn();
    };
    AuthService.prototype.isSeller = function () {
        var role = localStorage.getItem("role");
        if (role && role == "SELLER")
            return true;
        return false;
    };
    AuthService.prototype.isAccountActive = function () {
        try {
            var status_1 = localStorage.getItem("status");
            var userStatus = parseInt(status_1.toString());
            if (userStatus == 1)
                return true;
            else
                return false;
        }
        catch (err) {
            return false;
        }
    };
    AuthService.prototype.accountCanScan = function () {
        try {
            var status_2 = localStorage.getItem("status");
            var userStatus = parseInt(status_2.toString());
            if (userStatus == 1 || userStatus == 2)
                return true;
            else
                return false;
        }
        catch (err) {
            return false;
        }
    };
    AuthService.prototype.getToken = function () {
        return localStorage.getItem("id_token");
    };
    AuthService.prototype.isAdmin = function () {
        var role = localStorage.getItem("role");
        if (role && role == "ADMIN")
            return true;
        return false;
    };
    AuthService.prototype.isBuyer = function () {
        var role = localStorage.getItem("role");
        if (role && role == "BUYER")
            return true;
        return false;
    };
    AuthService.prototype.getExpiration = function () {
        var expiration = localStorage.getItem("expires_at");
        var expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    };
    Object.defineProperty(AuthService.prototype, "defaultNavigationURL", {
        get: function () {
            var role = localStorage.getItem("role");
            if (role && role == "BUYER")
                return this._defaultBuyerNav;
            if (role && role == "SELLER")
                return this._defaultSellerNav;
            if (role && role == "ADMIN")
                return this._defaultAdminNav;
            else
                return this._defaultNav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "redirectURL", {
        get: function () {
            if (localStorage.getItem('rd_url') && localStorage.getItem('rd_url') != 'null') {
                this._redirectURL = localStorage.getItem('rd_url');
                localStorage.removeItem("rd_url");
            }
            return this._redirectURL;
        },
        set: function (rdrcturl) {
            localStorage.setItem('rd_url', rdrcturl);
            this._redirectURL = rdrcturl;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.handleError = function (error) {
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
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map