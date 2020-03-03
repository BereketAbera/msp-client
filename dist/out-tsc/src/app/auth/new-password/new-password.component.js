import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { RegistrationCompleteComponent } from '../registration-complete/registration-complete.component';
var NewPasswordComponent = /** @class */ (function () {
    function NewPasswordComponent(route, dialog, userService, fb, router) {
        this.route = route;
        this.dialog = dialog;
        this.userService = userService;
        this.fb = fb;
        this.router = router;
        this.registeredByr = new EventEmitter();
        this.hide = true;
        this.token = "";
        this.showError = false;
        this.passwordRestForm = this.fb.group({
            token: [this.token],
            password: ["", Validators.required],
            confirmPassword: ["", Validators.required],
        });
    }
    NewPasswordComponent.prototype.close = function () {
        this.showError = false;
    };
    NewPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            console.log("this is test"); // {order: "popular"}
            _this.token = params.tk;
            console.log(_this.token); // popular
            _this.router.navigate['/invtkn'];
        });
    };
    NewPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        return this.userService.registerUser(this.passwordRestForm.value).subscribe(function (res) {
            if (res['success']) {
                var dialogRef = _this.dialog.open(RegistrationCompleteComponent, {
                    width: '350px',
                });
                dialogRef.afterClosed().subscribe(function (result) {
                    _this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(function () {
                        return _this.router.navigate(['/login/buyer']);
                    });
                });
                //this.registeredByr.emit("Buyer")   
                //this.router.navigate(['/login/buyer']);
            }
            else {
                _this.showError = true;
                _this.errors = res['messages'];
            }
        });
    };
    NewPasswordComponent.prototype.openTerms = function () {
    };
    NewPasswordComponent.prototype.openPrivacy = function () {
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], NewPasswordComponent.prototype, "registeredByr", void 0);
    NewPasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'app-new-password',
            templateUrl: './new-password.component.html',
            styleUrls: ['./new-password.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, MatDialog, UserService, FormBuilder, Router])
    ], NewPasswordComponent);
    return NewPasswordComponent;
}());
export { NewPasswordComponent };
//# sourceMappingURL=new-password.component.js.map