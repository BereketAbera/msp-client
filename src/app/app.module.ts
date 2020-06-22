import { RefundComponent } from "./components/refund/refund.component";
import { SellerTermsComponent } from "./components/seller-terms/seller-terms.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";

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
import { PublicComponent } from "./components/public/public.component";

import { httpInterceptorProviders } from "./http-interceptors/index";
import { ProductComponent } from "./components/product/product.component";
import { CartComponent } from "./components/cart/cart.component";
import { CartExpiredDialogComponent } from "./components/cart-expired-dialog/cart-expired-dialog.component";
import { OthersComponent } from "./components/others/others.component";
import { UtcProductComponent } from "./components/utc-product/utc-product.component";
import { CompanyProductsComponent } from "./components/company-products/company-products.component";
import { PublicProductsComponent } from "./components/public-products/public-products.component";
import { BuyerTermsComponent } from "./components/buyer-terms/buyer-terms.component";
import { CustomNotificationComponent } from "./components/custom-notification/custom-notification.component";
import { CartService } from "./service/cart.service";
import { ProductService } from "./service/product.service";
import { DataStorageService } from "./service/data-storage.service";
import { AuthService } from "./service/auth.service";
import { ZipcodeService } from "./service/zipcode.service";
import { CustomPreloadingService } from "./service/custom-preloading.service";
import { SubCategoryResolverService } from "./service/sub-category-resolver.service";
import { SubCategoryService } from "./service/sub-category.service";
import { WindowRef } from "./service/window.service";
import { StateService } from "./service/state.service";
import { SellerStaffService } from "./service/seller-staff.service";
import { ProductResolverService } from "./service/product-resolver.service";
import { MspMarkupResolverService } from "./service/msp-markup-resolver.service";
import { EditConfigModalComponent } from './system-admin/edit-config-modal/edit-config-modal.component';
import { ConfiguartionService } from './service/configuartion.service';
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
    OthersComponent,
    UtcProductComponent,
    CompanyProductsComponent,
    PublicProductsComponent,
    PrivacyComponent,
    BuyerTermsComponent,
    SellerTermsComponent,
    RefundComponent,
    EditConfigModalComponent
    //  DragDropDirective
    // CustomNotificationComponent,
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

    // ServiceWorkerModule.register("ngsw-worker.js", {
    //   enabled: environment.production,
    // }),
  ],
  entryComponents: [
    AppComponent,
    SaveConfirmationDialogComponent,
    SaveProgressComponent,
    CartExpiredDialogComponent,
    EditConfigModalComponent
  ],
  providers: [
    CartService,
    ProductService,
    DataStorageService,
    AuthService,
    ZipcodeService,
    SubCategoryService,
    SellerStaffService,
    ProductResolverService,
    MspMarkupResolverService,
    CustomPreloadingService,
    SubCategoryResolverService,
    WindowRef,
    httpInterceptorProviders,
    ConfiguartionService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfiguartionService) =>
        () => configService.loadConfigurationData(),
      deps: [ConfiguartionService],
      multi: true
    }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
