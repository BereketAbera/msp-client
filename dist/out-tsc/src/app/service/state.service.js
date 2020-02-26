import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from '../../environments/environment';
var stateApi = environment.APIEndpoint + "states";
var StateService = /** @class */ (function () {
    function StateService(http) {
        this.http = http;
        this.countSubject = new BehaviorSubject(0);
    }
    StateService.prototype.listStates = function () {
        var _this = this;
        return this.http.get(stateApi).pipe(map(function (res) {
            _this.countSubject.next(res['count']);
            return res['rows'];
        }), catchError(this.handleError));
    };
    StateService.prototype.handleError = function (error) {
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
    StateService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], StateService);
    return StateService;
}());
export { StateService };
//# sourceMappingURL=state.service.js.map