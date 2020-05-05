import { RefundComponent } from "./components/refund/refund.component";
import { SellerTermsComponent } from "./components/seller-terms/seller-terms.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatNativeDateModule } from "@angular/material";

import { RoutingModule } from "./routing.module";

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from "./components/home/home.component";
import { DealDetailComponent } from "./components/deal-detail/deal-detail.component";
import { BannerCtrlDirective } from "./components/bannerCtrl/banner-ctrl.directive";

import { SharedModule } from "./shared/shared.module";

import { SaveConfirmationDialogComponent } from "./shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "./shared/save-progress/save-progress.component";
import { BuyerModule } from "./buyer-admin/buyer.module";
import { SellerModule } from "./seller-admin/seller.module";
import { SystemAdminModule } from "./system-admin/system-admin.module";
import { AuthModule } from "./auth/auth.module";
import { PublicComponent } from "./components/public/public.component";

import { httpInterceptorProviders } from "./http-interceptors/index";
import { ProductComponent } from "./components/product/product.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { CartComponent } from "./components/cart/cart.component";
import { CartExpiredDialogComponent } from "./components/cart-expired-dialog/cart-expired-dialog.component";
import { BeautyComponent } from "./components/beauty/beauty.component";
import { OthersComponent } from "./components/others/others.component";
import { TestUtcComponent } from "./components/test-utc/test-utc.component";
import { UtcProductComponent } from "./components/utc-product/utc-product.component";
import { UtcDealDetailComponent } from "./components/utc-deal-detail/utc-deal-detail.component";
import { CompanyProductsComponent } from "./components/company-products/company-products.component";
import { PublicProductsComponent } from "./components/public-products/public-products.component";
import { BuyerTermsComponent } from "./components/buyer-terms/buyer-terms.component";
// import { DragDropDirective } from './service/drag-drop.directive';
// import { CustomNotificationComponent } from "./components/custom-notification/custom-notification.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DealDetailComponent,
    PublicComponent,
    ProductComponent,
    BannerCtrlDirective,
    CartComponent,
    CartExpiredDialogComponent,
    BeautyComponent,
    OthersComponent,
    TestUtcComponent,
    UtcProductComponent,
    UtcDealDetailComponent,
    CompanyProductsComponent,
    PublicProductsComponent,
    PrivacyComponent,
    BuyerTermsComponent,
    SellerTermsComponent,
    RefundComponent,
    //  DragDropDirective
    // CustomNotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RoutingModule,
    // DragDropDirective,

    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  entryComponents: [
    AppComponent,
    SaveConfirmationDialogComponent,
    SaveProgressComponent,
    CartExpiredDialogComponent,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
