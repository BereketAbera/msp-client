import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
var userAPI = environment.APIEndpoint + "register";
var accountAPI = environment.APIEndpoint + "accounts";
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.countSubject = new BehaviorSubject(0);
    }
    UserService.prototype.registerUser = function (user) {
        return this.http.post(userAPI, user).pipe(catchError(this.handleError));
    };
    UserService.prototype.registerSlrUser = function (user) {
        return this.http.post(userAPI + '/crtslrfr', user).pipe(catchError(this.handleError));
    };
    UserService.prototype.registerByrUser = function (user) {
        return this.http.post(userAPI + '/crtbyrrfr', user).pipe(catchError(this.handleError));
    };
    UserService.prototype.getReferedEmail = function (tk) {
        return this.http.get(userAPI + '/rfrdeml', {
            params: new HttpParams()
                .set('tk', tk.toString())
        }).pipe(catchError(this.handleError));
    };
    UserService.prototype.inviteBuyers = function (emails) {
        return this.http.post(accountAPI + "/invtbyrs", emails).pipe(catchError(this.handleError));
    };
    UserService.prototype.isEmailUsed = function (email) {
        return this.http.get(accountAPI + '/isemlusd', {
            params: new HttpParams()
                .set('email', email.toString())
        }).pipe(catchError(this.handleError));
    };
    UserService.prototype.inviteSellers = function (emails) {
        return this.http.post(accountAPI + "/invtslrs", emails).pipe(catchError(this.handleError));
    };
    UserService.prototype.getSellerDailySlsSmry = function (fltrDate) {
        var _this = this;
        return this.http.get(accountAPI + "/slsdlysmry", {
            params: new HttpParams()
                .set('datefltr', fltrDate.toString())
        }).pipe(map(function (res) {
            _this.countSubject.next(res.length);
            return res;
        }), catchError(this.handleError));
    };
    UserService.prototype.listRefers = function (filter, sortOrder, pageNumber, pageSize) {
        var _this = this;
        if (filter === void 0) { filter = ''; }
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 5; }
        return this.http.get(accountAPI + "/lstrfrs", {
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
    UserService.prototype.getBalance = function () {
        return this.http.get(accountAPI + "/balance").pipe(map(function (balance) {
            if (balance['amount'] && balance['amount'].balance)
                return { 'amount': balance['amount'].balance };
            else if (balance['amount'])
                return { 'amount': balance['amount'] };
            else
                return { 'amount': 0 };
        }), catchError(this.handleError));
    };
    UserService.prototype.getSellerSummary = function () {
        return this.http.get(accountAPI + "/slrsmry").pipe(map(function (serllerSummary) {
            return serllerSummary;
        }), catchError(this.handleError));
    };
    UserService.prototype.getTransaction = function (id) {
        return this.http.get(accountAPI + "/ordr/" + id).pipe(map(function (transaction) {
            return transaction;
        }), catchError(this.handleError));
    };
    UserService.prototype.getDeposit = function (id) {
        return this.http.get(accountAPI + "/dpst/" + id).pipe(map(function (deposit) {
            return deposit;
        }), catchError(this.handleError));
    };
    UserService.prototype.changeUserStatus = function (id, status) {
        return this.http.post(accountAPI + "/seller", { userId: id, status: status }).pipe(catchError(this.handleError));
    };
    UserService.prototype.listMerchants = function (usrId, filter, sortOrder, pageNumber, pageSize) {
        var _this = this;
        if (filter === void 0) { filter = ''; }
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 5; }
        return this.http.get(accountAPI + "/sellers", {
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
    UserService.prototype.getRevenuReport = function (sDate, eDate) {
        if (sDate === void 0) { sDate = ''; }
        if (eDate === void 0) { eDate = ''; }
        return this.http.get(accountAPI + "/rvnurpt", {
            params: new HttpParams()
                .set('sDate', sDate)
                .set('eDate', eDate)
        }).pipe(map(function (revenuRprt) {
            return revenuRprt;
        }), catchError(this.handleError));
    };
    UserService.prototype.getGreditCards = function () {
        return this.http.get(accountAPI + "/crdtCrds").pipe(map(function (res) {
            return res['rows'];
        }), catchError(this.handleError));
    };
    UserService.prototype.handleError = function (error) {
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
    UserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map