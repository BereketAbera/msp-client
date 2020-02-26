import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { RegistrationCompleteComponent } from '../registration-complete/registration-complete.component';
var RegisterBuyerRefComponent = /** @class */ (function () {
    function RegisterBuyerRefComponent(route, dialog, userService, fb, router) {
        this.route = route;
        this.dialog = dialog;
        this.userService = userService;
        this.fb = fb;
        this.router = router;
        this.registeredByr = new EventEmitter();
        this.hide = true;
        this.showError = false;
        this.referedEmail = "";
        this.registrationForm = this.fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            phoneNumber: ["", Validators.required],
            password: ["", Validators.required],
            agreed: [false, Validators.required],
            role: ["BUYER", Validators.required],
        });
    }
    RegisterBuyerRefComponent.prototype.close = function () {
        this.showError = false;
    };
    RegisterBuyerRefComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams
            .filter(function (params) { return params.tk; })
            .subscribe(function (params) {
            _this.tk = params.tk;
            _this.userService.getReferedEmail(_this.tk).subscribe(function (rslt) {
                _this.registrationForm.get('email').setValue(rslt['email']);
            });
        });
    };
    RegisterBuyerRefComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.registrationForm.get('agreed').value) {
            var usrInfo = this.registrationForm.value;
            usrInfo.tk = this.tk;
            return this.userService.registerByrUser(this.registrationForm.value).subscribe(function (res) {
                if (res['success']) {
                    var dialogRef = _this.dialog.open(RegistrationCompleteComponent, {
                        width: '350px',
                    });
                    dialogRef.afterClosed().subscribe(function (result) {
                        _this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(function () {
                            return _this.router.navigate(['/login/buyer']);
                        });
                    });
                }
                else {
                    _this.showError = true;
                    _this.errors = res['messages'];
                }
            });
        }
        else {
            this.showError = true;
            this.errors = ["Please agree to the buyer's terms of use and privacy."];
        }
    };
    RegisterBuyerRefComponent.prototype.openTerms = function () {
    };
    RegisterBuyerRefComponent.prototype.openPrivacy = function () {
    };
    RegisterBuyerRefComponent.prototype.getErrorMessage = function () {
        return this.registrationForm.get('email').hasError('required') ? 'You must enter a value' :
            this.registrationForm.get('email').hasError('email') ? 'Not a valid email' :
                '';
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], RegisterBuyerRefComponent.prototype, "registeredByr", void 0);
    RegisterBuyerRefComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register-buyer-ref',
            templateUrl: './register-buyer-ref.component.html',
            styleUrls: ['./register-buyer-ref.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, MatDialog, UserService, FormBuilder, Router])
    ], RegisterBuyerRefComponent);
    return RegisterBuyerRefComponent;
}());
export { RegisterBuyerRefComponent };
//# sourceMappingURL=register-buyer-ref.component.js.map