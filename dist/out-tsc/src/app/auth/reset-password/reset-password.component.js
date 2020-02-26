import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(authService, fb, router, route) {
        this.authService = authService;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.hide = true;
        this.showError = false;
        this.resetForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
        });
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
    };
    ResetPasswordComponent.prototype.close = function () {
        this.showError = false;
    };
    ResetPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        return this.authService.reqPwdRest(this.resetForm.value).subscribe(function (res) {
            alert("Password reset instructions have been sent to your account email.");
            _this.router.navigate(['/']);
        }, function (error) {
            _this.showError = true;
            _this.errors = error.messages;
        });
    };
    ResetPasswordComponent.prototype.getErrorMessage = function () {
        return this.resetForm.get('email').hasError('required') ? 'You must enter a value' :
            this.resetForm.get('email').hasError('email') ? 'Not a valid email' : '';
    };
    ResetPasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, FormBuilder, Router, ActivatedRoute])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
export { ResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map