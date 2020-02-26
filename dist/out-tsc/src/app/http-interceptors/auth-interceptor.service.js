import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
var AuthInterceptorService = /** @class */ (function () {
    function AuthInterceptorService(auth) {
        this.auth = auth;
    }
    AuthInterceptorService.prototype.intercept = function (req, next) {
        // Get the auth token from the service.
        if (this.auth.isLoggedIn()) {
            var authToken = this.auth.getToken();
            if (authToken) {
                var authReq = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + authToken)
                });
                return next.handle(authReq);
            }
            else {
                return next.handle(req);
            }
        }
        else {
            return next.handle(req);
        }
    };
    AuthInterceptorService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AuthService])
    ], AuthInterceptorService);
    return AuthInterceptorService;
}());
export { AuthInterceptorService };
//# sourceMappingURL=auth-interceptor.service.js.map