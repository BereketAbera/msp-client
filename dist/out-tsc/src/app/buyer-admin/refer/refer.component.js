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
var ReferComponent = /** @class */ (function () {
    function ReferComponent(userService) {
        this.userService = userService;
        this.emails = [];
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.matcher = new MyErrorStateMatcher();
    }
    ReferComponent.prototype.addEmail = function () {
        if (this.emailFormControl.valid && (this.emails.indexOf(this.emailFormControl.value) < 0)) {
            this.emails.push(this.emailFormControl.value);
            this.emailFormControl.reset();
        }
    };
    ReferComponent.prototype.remove = function (email) {
        var indx = this.emails.indexOf(email);
        if (indx >= 0)
            this.emails.splice(indx);
    };
    ReferComponent.prototype.inviteUsers = function () {
        this.userService.inviteSellers(this.emails).subscribe(function (rsp) {
            alert("Invitation sent to users");
        });
    };
    ReferComponent.prototype.ngOnInit = function () {
    };
    ReferComponent = tslib_1.__decorate([
        Component({
            selector: 'app-refer',
            templateUrl: './refer.component.html',
            styleUrls: ['./refer.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], ReferComponent);
    return ReferComponent;
}());
export { ReferComponent };
//# sourceMappingURL=refer.component.js.map