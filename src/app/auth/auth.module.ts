import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';

import {DemoMaterialModule} from '../material/material.module';

import { LoginComponent }    from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterSellerComponent } from './register-seller/register-seller.component';
import { RegisterBuyerComponent } from './register-buyer/register-buyer.component';
import { RegistrationCompleteComponent } from './registration-complete/registration-complete.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { InvalidTokenComponent } from './invalid-token/invalid-token.component';
import { RegisterSellerRefComponent } from './register-seller-ref/register-seller-ref.component';
import { RegisterBuyerRefComponent } from './register-buyer-ref/register-buyer-ref.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    AuthRoutingModule
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
    
  ],
  entryComponents:[
    RegistrationCompleteComponent
  ]
})
export class AuthModule {}