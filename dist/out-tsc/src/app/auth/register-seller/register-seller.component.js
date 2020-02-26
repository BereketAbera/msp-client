import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { RegistrationCompleteComponent } from '../registration-complete/registration-complete.component';
var RegisterSellerComponent = /** @class */ (function () {
    function RegisterSellerComponent(dialog, router, userService, fb) {
        this.dialog = dialog;
        this.router = router;
        this.userService = userService;
        this.fb = fb;
        this.registeredSlr = new EventEmitter();
        this.hide = true;
        this.showError = false;
        this.registrationForm = this.fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            companyName: ["", Validators.required],
            phoneNumber: ["", Validators.required],
            address: ["", Validators.required],
            websiteURL: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
            agreed: [false, Validators.required],
            role: ["SELLER", Validators.required],
        });
    }
    RegisterSellerComponent.prototype.ngOnInit = function () {
    };
    RegisterSellerComponent.prototype.openTerms = function () {
    };
    RegisterSellerComponent.prototype.openPrivacy = function () {
    };
    RegisterSellerComponent.prototype.close = function () {
        this.showError = false;
    };
    RegisterSellerComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.registrationForm.get('agreed').value) {
            return this.userService.registerUser(this.registrationForm.value).subscribe(function (res) {
                if (res['success']) {
                    var dialogRef = _this.dialog.open(RegistrationCompleteComponent, {
                        width: '350px',
                    });
                    dialogRef.afterClosed().subscribe(function (result) {
                        _this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(function () {
                            return _this.router.navigate(['/login/seller']);
                        });
                    });
                    //this.registeredSlr.emit("seller");
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
    RegisterSellerComponent.prototype.getErrorMessage = function () {
        return this.registrationForm.get('email').hasError('required') ? 'You must enter a value' :
            this.registrationForm.get('email').hasError('email') ? 'Not a valid email' :
                '';
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], RegisterSellerComponent.prototype, "registeredSlr", void 0);
    RegisterSellerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register-seller',
            templateUrl: './register-seller.component.html',
            styleUrls: ['./register-seller.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog, Router, UserService, FormBuilder])
    ], RegisterSellerComponent);
    return RegisterSellerComponent;
}());
export { RegisterSellerComponent };
//# sourceMappingURL=register-seller.component.js.map