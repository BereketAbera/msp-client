import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { NewPasswordComponent } from "./new-password/new-password.component";
import { InvalidTokenComponent } from "./invalid-token/invalid-token.component";
import { RegisterBuyerRefComponent } from "./register-buyer-ref/register-buyer-ref.component";
import { RegisterSellerRefComponent } from "./register-seller-ref/register-seller-ref.component";
import { AuthComponent } from "./auth.component";

const authRoutes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "login/:type", component: LoginComponent },
      { path: "login", component: LoginComponent },
      { path: "rstpwrd", component: ResetPasswordComponent },
      { path: "nwpwd", component: NewPasswordComponent },
      { path: "invtkn", component: InvalidTokenComponent },
      { path: "regslrrfr", component: RegisterSellerRefComponent },
      { path: "regbyrrfr", component: RegisterBuyerRefComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
