import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from '../../environments/environment';
var transactionApi = environment.APIEndpoint + "transactions";
var TransactionService = /** @class */ (function () {
    function TransactionService(http) {
        this.http = http;
        this.countSubject = new BehaviorSubject(0);
    }
    TransactionService.prototype.createTransaction = function (transaction) {
        return this.http.post(transactionApi, transaction).pipe(catchError(this.handleError));
    };
    TransactionService.prototype.createDeposit = function (transaction) {
        return this.http.post(transactionApi + "/deposit", transaction).pipe(catchError(this.handleError));
    };
    TransactionService.prototype.acceptOrder = function (isOk, id) {
        return this.http.post(transactionApi + "/acptordr", { id: id, isOk: isOk }).pipe(catchError(this.handleError));
    };
    TransactionService.prototype.processTransactionQRCode = function (qrCodeData) {
        var qrDate = {
            trnsId: qrCodeData.transactionId,
            qrCode: qrCodeData.qrCode
        };
        return this.http.post(transactionApi + "/acceptqrcode", qrDate).pipe(map(function (transaction) {
            return transaction;
        }), catchError(this.handleError));
    };
    TransactionService.prototype.processTransactionQRCdCode = function (qrCodeData) {
        var qrDate = {
            cd: qrCodeData.code,
            qrCode: qrCodeData.qrCode
        };
        return this.http.post(transactionApi + "/acceptqrcdcode", qrDate).pipe(map(function (transaction) {
            return transaction;
        }), catchError(this.handleError));
    };
    TransactionService.prototype.getQRCode = function (id) {
        return this.http.get(transactionApi + "/qrcode/" + id, {
            responseType: "blob"
        }).pipe(map(function (rslt) {
            return rslt;
        }), catchError(this.handleError));
    };
    TransactionService.prototype.getQRCodeForTransaction = function (id) {
        return this.http.get(transactionApi + "/qrdata/" + id).pipe(map(function (transaction) {
            return transaction;
        }), catchError(this.handleError));
    };
    TransactionService.prototype.getCdCodeForTransaction = function (cd) {
        return this.http.get(transactionApi + "/cddata/" + cd).pipe(map(function (transaction) {
            return transaction;
        }), catchError(this.handleError));
    };
    TransactionService.prototype.getTransactionStatus = function (id) {
        return this.http.get(transactionApi + "/trnsStatus/" + id).pipe(map(function (transaction) {
            return transaction;
        }), catchError(this.handleError));
    };
    TransactionService.prototype.getOrderSeller = function (id) {
        return this.http.get(transactionApi + "/ordrsnnd/" + id).pipe(map(function (transaction) {
            return transaction;
        }), catchError(this.handleError));
    };
    TransactionService.prototype.getTransaction = function (id) {
        return this.http.get(transactionApi + "/spc/" + id).pipe(map(function (transaction) {
            return transaction;
        }), catchError(this.handleError));
    };
    TransactionService.prototype.getSellerTransaction = function (id) {
        return this.http.get(transactionApi + "/slrtrnsct/" + id).pipe(map(function (transaction) {
            return transaction;
        }), catchError(this.handleError));
    };
    TransactionService.prototype.getSupplier = function (id) {
        return this.http.get(transactionApi + "/splir/" + id).pipe(map(function (supplier) {
            return supplier;
        }), catchError(this.handleError));
    };
    TransactionService.prototype.listBuyerTransactions = function (usrId, filter, sortOrder, pageNumber, pageSize) {
        var _this = this;
        if (filter === void 0) { filter = ''; }
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 5; }
        return this.http.get(transactionApi + "/buyer", {
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
    TransactionService.prototype.listTransactions = function (usrId, filter, sortOrder, pageNumber, pageSize) {
        var _this = this;
        if (filter === void 0) { filter = ''; }
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 5; }
        return this.http.get(transactionApi, {
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
    TransactionService.prototype.listOrders = function (usrId, filter, sortOrder, pageNumber, pageSize) {
        var _this = this;
        if (filter === void 0) { filter = ''; }
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 5; }
        return this.http.get(transactionApi + "/orders", {
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
    TransactionService.prototype.listSellersOrders = function (usrId, filter, sortOrder, pageNumber, pageSize) {
        var _this = this;
        if (filter === void 0) { filter = ''; }
        if (sortOrder === void 0) { sortOrder = 'asc'; }
        if (pageNumber === void 0) { pageNumber = 0; }
        if (pageSize === void 0) { pageSize = 5; }
        return this.http.get(transactionApi + "/slrordrs", {
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
    TransactionService.prototype.handleError = function (error) {
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
    TransactionService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], TransactionService);
    return TransactionService;
}());
export { TransactionService };
//# sourceMappingURL=transaction.service.js.map