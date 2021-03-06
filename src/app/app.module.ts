import { ZipProductsComponent } from "./components/zip-products/zip-products.component";
import { UserService } from "./service/user.service";
import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import "../polyfills";
import { AppComponent } from "./app.component";
import { BannerCtrlDirective } from "./components/bannerCtrl/banner-ctrl.directive";
import { BuyerTermsComponent } from "./components/buyer-terms/buyer-terms.component";
import { CartExpiredDialogComponent } from "./components/cart-expired-dialog/cart-expired-dialog.component";
import { CartComponent } from "./components/cart/cart.component";
import { CompanyProductsComponent } from "./components/company-products/company-products.component";
import { DealDetailComponent } from "./components/deal-detail/deal-detail.component";
import { HomeComponent } from "./components/home/home.component";
import { OthersComponent } from "./components/others/others.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { ProductComponent } from "./components/product/product.component";
import { PublicProductsComponent } from "./components/public-products/public-products.component";
import { PublicComponent } from "./components/public/public.component";
import { RefundComponent } from "./components/refund/refund.component";
import { SellerHomeComponent } from "./components/seller-home/seller-home.component";
import { SellerTermsComponent } from "./components/seller-terms/seller-terms.component";
import { UtcProductComponent } from "./components/utc-product/utc-product.component";
import { httpInterceptorProviders } from "./http-interceptors/index";
import { RoutingModule } from "./routing.module";
import { AuthService } from "./service/auth.service";
import { CartService } from "./service/cart.service";
import { ConfigurationService } from "./service/configuartion.service";
import { CustomPreloadingService } from "./service/custom-preloading.service";
import { DataStorageService } from "./service/data-storage.service";
import { MspMarkupResolverService } from "./service/msp-markup-resolver.service";
import { ProductResolverService } from "./service/product-resolver.service";
import { ProductService } from "./service/product.service";
import { SellerStaffService } from "./service/seller-staff.service";
import { SubCategoryResolverService } from "./service/sub-category-resolver.service";
import { SubCategoryService } from "./service/sub-category.service";
import { WindowRef } from "./service/window.service";
import { ZipcodeService } from "./service/zipcode.service";
import { SaveConfirmationDialogComponent } from "./shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "./shared/save-progress/save-progress.component";
import { SharedModule } from "./shared/shared.module";
import { EditConfigModalComponent } from "./system-admin/edit-config-modal/edit-config-modal.component";
import { BuyerHomeComponent } from "./components/buyer-home/buyer-home.component";
import { MatVideoModule } from "mat-video";

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
    EditConfigModalComponent,
    SellerHomeComponent,
    BuyerHomeComponent,
    ZipProductsComponent
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
    MatVideoModule
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
    ConfigurationService,
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigurationService) => () =>
        configService.loadConfigurationData(),
      deps: [ConfigurationService],
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
