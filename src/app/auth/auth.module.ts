import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DemoMaterialModule } from "../material/material.module";
import { StateResolverService } from "../service/state-resolver.service";
import { StateService } from "../service/state.service";
import { UserService } from "../service/user.service";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { CustomSubmitComponent } from "./custom-submit/custom-submit.component";
import { InvalidTokenComponent } from "./invalid-token/invalid-token.component";
import { LoginComponent } from "./login/login.component";
import { NewPasswordComponent } from "./new-password/new-password.component";
import { RegisterBuyerRefComponent } from "./register-buyer-ref/register-buyer-ref.component";
import { RegisterBuyerComponent } from "./register-buyer/register-buyer.component";
import { RegisterSellerRefComponent } from "./register-seller-ref/register-seller-ref.component";
import { RegisterSellerComponent } from "./register-seller/register-seller.component";
import { RegisterComponent } from "./register/register.component";
import { RegistrationCompleteComponent } from "./registration-complete/registration-complete.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AuthService } from "../service/auth.service";
import { SignupComponent } from './signup/signup.component';

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
    SignupComponent,
    // CustomNotificationComponent,
  ],
  entryComponents: [RegistrationCompleteComponent],
  providers: [UserService, StateService, StateResolverService, AuthService],
})
export class AuthModule {}
