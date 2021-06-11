import { CommonSingupComponent } from "./common-singup/common-singup.component";
import { SignupSellerComponent } from "./signup-seller/signup-seller.component";
import { SignupComponent } from "./signup/signup.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StateResolverService } from "../service/state-resolver.service";
import { AuthComponent } from "./auth.component";
import { InvalidTokenComponent } from "./invalid-token/invalid-token.component";
import { LoginComponent } from "./login/login.component";
import { NewPasswordComponent } from "./new-password/new-password.component";
import { RegisterBuyerRefComponent } from "./register-buyer-ref/register-buyer-ref.component";
import { RegisterSellerRefComponent } from "./register-seller-ref/register-seller-ref.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const authRoutes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "login/:type",
        component: LoginComponent,
        resolve: {
          states: StateResolverService
        }
      },
      {
        path: "login",
        component: LoginComponent,
        resolve: {
          states: StateResolverService
        }
      },
      {
        path: "signup",
        component: SignupComponent,
        resolve: {
          states: StateResolverService
        }
      },
      {
        path: "signup-buyer",
        component: CommonSingupComponent,
        resolve: {
          states: StateResolverService
        }
      },
      {
        path: "signup-seller",
        component: SignupSellerComponent,
        resolve: {
          states: StateResolverService
        }
      },
      { path: "rstpwrd", component: ResetPasswordComponent },
      { path: "nwpwd", component: NewPasswordComponent },
      { path: "invtkn", component: InvalidTokenComponent },
      {
        path: "regslrrfr",
        component: RegisterSellerRefComponent,
        resolve: {
          states: StateResolverService
        }
      },
      {
        path: "regbyrrfr",
        component: RegisterBuyerRefComponent,
        resolve: {
          states: StateResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
