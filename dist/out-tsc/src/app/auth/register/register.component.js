import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../service/user.service';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(userService, fb) {
        this.userService = userService;
        this.fb = fb;
        this.hide = true;
        this.registrationForm = this.fb.group({
            fullName: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
            role: ["", Validators.required],
        });
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onSubmit = function () {
        return this.userService.registerUser(this.registrationForm.value).subscribe(function (res) {
            console.log('user created');
        });
    };
    RegisterComponent.prototype.getErrorMessage = function () {
        return this.registrationForm.get('email').hasError('required') ? 'You must enter a value' :
            this.registrationForm.get('email').hasError('email') ? 'Not a valid email' :
                '';
    };
    RegisterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, FormBuilder])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map