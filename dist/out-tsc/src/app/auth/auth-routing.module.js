import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { InvalidTokenComponent } from './invalid-token/invalid-token.component';
import { RegisterBuyerRefComponent } from './register-buyer-ref/register-buyer-ref.component';
import { RegisterSellerRefComponent } from './register-seller-ref/register-seller-ref.component';
var authRoutes = [
    { path: 'login/:type', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'rstpwrd', component: ResetPasswordComponent },
    { path: 'nwpwd', component: NewPasswordComponent },
    { path: 'invtkn', component: InvalidTokenComponent },
    { path: 'regslrrfr', component: RegisterSellerRefComponent },
    { path: 'regbyrrfr', component: RegisterBuyerRefComponent },
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forChild(authRoutes)
            ],
            exports: [
                RouterModule
            ]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());
export { AuthRoutingModule };
//# sourceMappingURL=auth-routing.module.js.map