import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { RegistrationCompleteComponent } from '../registration-complete/registration-complete.component';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
var RegisterSellerRefComponent = /** @class */ (function () {
    function RegisterSellerRefComponent(route, dialog, router, userService, fb) {
        this.route = route;
        this.dialog = dialog;
        this.router = router;
        this.userService = userService;
        this.fb = fb;
        this.hide = true;
        this.showError = false;
        this.referedEmail = "";
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
    RegisterSellerRefComponent.prototype.ngOnInit = function () {
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
    RegisterSellerRefComponent.prototype.close = function () {
        this.showError = false;
    };
    RegisterSellerRefComponent.prototype.getErrorMessage = function () {
        return this.registrationForm.get('email').hasError('required') ? 'You must enter a value' :
            this.registrationForm.get('email').hasError('email') ? 'Not a valid email' :
                '';
    };
    RegisterSellerRefComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.registrationForm.get('agreed').value) {
            var usrInfo = this.registrationForm.value;
            usrInfo.tk = this.tk;
            return this.userService.registerSlrUser(usrInfo).subscribe(function (res) {
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
    RegisterSellerRefComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register-seller-ref',
            templateUrl: './register-seller-ref.component.html',
            styleUrls: ['./register-seller-ref.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, MatDialog, Router, UserService, FormBuilder])
    ], RegisterSellerRefComponent);
    return RegisterSellerRefComponent;
}());
export { RegisterSellerRefComponent };
//# sourceMappingURL=register-seller-ref.component.js.map