import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { DemoMaterialModule } from "../material/material.module";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { RegisterSellerComponent } from "./register-seller/register-seller.component";
import { RegisterBuyerComponent } from "./register-buyer/register-buyer.component";
import { RegistrationCompleteComponent } from "./registration-complete/registration-complete.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { NewPasswordComponent } from "./new-password/new-password.component";
import { InvalidTokenComponent } from "./invalid-token/invalid-token.component";
import { RegisterSellerRefComponent } from "./register-seller-ref/register-seller-ref.component";
import { RegisterBuyerRefComponent } from "./register-buyer-ref/register-buyer-ref.component";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";
import { CustomSubmitComponent } from "./custom-submit/custom-submit.component";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";
import { ZipcodeService } from "../service/zipcode.service";
import { StateResolverService } from "../service/state-resolver.service";
import { StateService } from "../service/state.service";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
// import { CustomNotificationComponent } from "../components/custom-notification/custom-notification.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    SharedModule,
    AuthRoutingModule,
    MatSlideToggleModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterSellerComponent,
    RegisterBuyerComponent,
    RegistrationCompleteComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    InvalidTokenComponent,
    RegisterSellerRefComponent,
    RegisterBuyerRefComponent,
    AuthComponent,
    CustomSubmitComponent,
    // CustomNotificationComponent,
  ],
  entryComponents: [RegistrationCompleteComponent],
  providers: [UserService, StateService, StateResolverService],
})
export class AuthModule {}
