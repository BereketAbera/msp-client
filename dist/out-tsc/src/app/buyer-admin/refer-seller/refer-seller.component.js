import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
/** Error when invalid control is dirty, touched, or submitted. */
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    return MyErrorStateMatcher;
}());
export { MyErrorStateMatcher };
var ReferSellerComponent = /** @class */ (function () {
    function ReferSellerComponent(userService) {
        this.userService = userService;
        this.emails = [];
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.matcher = new MyErrorStateMatcher();
    }
    ReferSellerComponent.prototype.addEmail = function () {
        var _this = this;
        if (this.emailFormControl.valid && (this.emails.indexOf(this.emailFormControl.value) < 0)) {
            this.userService.isEmailUsed(this.emailFormControl.value).subscribe(function (rslt) {
                if (!rslt['isUsed']) {
                    _this.emails.push(_this.emailFormControl.value);
                    _this.emailFormControl.reset();
                }
                else {
                    alert("Sorry, Email already used.");
                }
            });
        }
    };
    ReferSellerComponent.prototype.remove = function (email) {
        var indx = this.emails.indexOf(email);
        if (indx >= 0)
            this.emails.splice(indx);
    };
    ReferSellerComponent.prototype.inviteUsers = function () {
        var _this = this;
        this.userService.inviteSellers(this.emails).subscribe(function (rsp) {
            alert("Invitation sent to users");
            _this.emails = [];
        });
    };
    ReferSellerComponent.prototype.ngOnInit = function () {
    };
    ReferSellerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-refer-seller',
            templateUrl: './refer-seller.component.html',
            styleUrls: ['./refer-seller.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], ReferSellerComponent);
    return ReferSellerComponent;
}());
export { ReferSellerComponent };
//# sourceMappingURL=refer-seller.component.js.map