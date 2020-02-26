import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { environment } from '../../../environments/environment';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, fb, router, route) {
        this.authService = authService;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.selectedIndex = 0;
        this.hide = true;
        this.version = environment.version;
        this.showError = false;
        this.type = "normal";
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.type = this.route.snapshot.paramMap.get('type');
        if (!this.type)
            this.type = "normal";
    };
    LoginComponent.prototype.getErrorMessage = function () {
        return this.loginForm.get('email').hasError('required') ? 'You must enter a value' :
            this.loginForm.get('email').hasError('email') ? 'Not a valid email' :
                '';
    };
    Object.defineProperty(LoginComponent.prototype, "showBuyer", {
        get: function () {
            if (this.type == "buyer" || this.type == "normal")
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "showSeller", {
        get: function () {
            if (this.type == "seller" || this.type == "normal")
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.setSelectedIndexBuyer = function () {
        this.selectedIndex = 0;
        this.type = "buyer";
    };
    LoginComponent.prototype.setSelectedIndexSeller = function () {
        this.selectedIndex = 0;
        this.type = "seller";
    };
    LoginComponent.prototype.close = function () {
        this.showError = false;
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        return this.authService.login(this.loginForm.value).subscribe(function (res) {
            if (_this.authService.redirectURL) {
                _this.router.navigateByUrl(_this.authService.redirectURL);
            }
            else
                _this.router.navigate([_this.authService.defaultNavigationURL]);
        }, function (error) {
            _this.showError = true;
            _this.errors = error.messages;
        });
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, FormBuilder, Router, ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map