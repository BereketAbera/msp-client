import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { RegistrationCompleteComponent } from '../registration-complete/registration-complete.component';
var RegisterBuyerComponent = /** @class */ (function () {
    function RegisterBuyerComponent(dialog, userService, fb, router) {
        this.dialog = dialog;
        this.userService = userService;
        this.fb = fb;
        this.router = router;
        this.registeredByr = new EventEmitter();
        this.hide = true;
        this.showError = false;
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
    RegisterBuyerComponent.prototype.close = function () {
        this.showError = false;
    };
    RegisterBuyerComponent.prototype.ngOnInit = function () {
    };
    RegisterBuyerComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.registrationForm.get('agreed').value) {
            return this.userService.registerUser(this.registrationForm.value).subscribe(function (res) {
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
        }
        else {
            this.showError = true;
            this.errors = ["Please agree to the buyer's terms of use and privacy."];
        }
    };
    RegisterBuyerComponent.prototype.openTerms = function () {
    };
    RegisterBuyerComponent.prototype.openPrivacy = function () {
    };
    RegisterBuyerComponent.prototype.getErrorMessage = function () {
        return this.registrationForm.get('email').hasError('required') ? 'You must enter a value' :
            this.registrationForm.get('email').hasError('email') ? 'Not a valid email' :
                '';
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], RegisterBuyerComponent.prototype, "registeredByr", void 0);
    RegisterBuyerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register-buyer',
            templateUrl: './register-buyer.component.html',
            styleUrls: ['./register-buyer.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog, UserService, FormBuilder, Router])
    ], RegisterBuyerComponent);
    return RegisterBuyerComponent;
}());
export { RegisterBuyerComponent };
//# sourceMappingURL=register-buyer.component.js.map