import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from '../../environments/environment';
var zipcodeApi = environment.APIEndpoint + "zipcods";
var ZipcodeService = /** @class */ (function () {
    function ZipcodeService(http) {
        this.http = http;
        this.countSubject = new BehaviorSubject(0);
    }
    ZipcodeService.prototype.listZipcods = function (search) {
        var _this = this;
        return this.http.get(zipcodeApi, {
            params: new HttpParams()
                .set('search', search)
        }).pipe(map(function (res) {
            _this.countSubject.next(res['count']);
            return res['rows'];
        }), catchError(this.handleError));
    };
    ZipcodeService.prototype.handleError = function (error) {
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
    ZipcodeService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ZipcodeService);
    return ZipcodeService;
}());
export { ZipcodeService };
//# sourceMappingURL=zipcode.service.js.map