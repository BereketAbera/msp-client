import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { ImageCropperModule } from "ngx-image-cropper";
import { DragDropDirective } from "../service/drag-drop.directive";
import { FeaturesResolverService } from "../service/features-resolver.service";
import { GalleryResolverService } from "../service/gallery-resolver.service";
import { GeocoderService } from "../service/geocoder.service";
import { MarkupResolverService } from "../service/markup-resolver.service";
import { ProfileResolverService } from "../service/profile-resolver.service";
import { RevenuRprtResolverService } from "../service/revenu-rprt-resolver.service";
import { SellerOrderResolverService } from "../service/seller-order-resolver.service";
import { SellerSummaryResolverService } from "../service/seller-summary-resolver.service";
import { ShopByIdResolverService } from "../service/shop-by-id-resolver.service";
import { ShopResolverService } from "../service/shop-resolver.service";
import { ShopsService } from "../service/shops.service";
import { StaffResolverService } from "../service/staff-resolver.service";
import { StateResolverService } from "../service/state-resolver.service";
import { StateService } from "../service/state.service";
import { TransactionService } from "../service/transaction.service";
import { UploadService } from "../service/upload.service";
import { UserFeaturesResolverService } from "../service/user-features-resolver.service";
import { UserService } from "../service/user.service";
import { SharedModule } from "../shared/shared.module";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { AddNewAdComponent } from "./add-new-ad/add-new-ad.component";
import { AddStaffComponent } from "./add-staff/add-staff.component";
import { EditShopComponent } from "./edit-shop/edit-shop.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { ManageStaffAccessComponent } from "./manage-staff-access/manage-staff-access.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { NewOffPeakProductComponent } from "./new-off-peak-product/new-off-peak-product.component";
import { NewShopComponent } from "./new-shop/new-shop.component";
import { ProductsComponent } from "./products/products.component";
import { ProfileComponent } from "./profile/profile.component";
import { QrScannerComponent } from "./qr-scanner/qr-scanner.component";
import { RequestCodeConfirmationComponent } from "./request-code-confirmation/request-code-confirmation.component";
import { RequestConfirmationComponent } from "./request-confirmation/request-confirmation.component";
import { RequestResultComponent } from "./request-result/request-result.component";
import { SalesSummaryComponent } from "./sales-summary/sales-summary.component";
import { SellerAdminComponent } from "./seller-admin.component";
import { SellerDashboardComponent } from "./seller-dashboard/seller-dashboard.component";
import { SellerOrderDetailComponent } from "./seller-order-detail/seller-order-detail.component";
import { SellerRoutingModule } from "./seller-routing.module";
import { ShopListComponent } from "./shop-list/shop-list.component";
import { StaffsComponent } from "./staffs/staffs.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { UploadImgComponent } from "./upload-img/upload-img.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SellerRoutingModule,
    ImageCropperModule,
  ],
  declarations: [
    NavigationComponent,
    SellerAdminComponent,
    AddNewAdComponent,
    NewShopComponent,
    ShopListComponent,
    SellerDashboardComponent,
    ProductsComponent,
    TransactionsComponent,
    QrScannerComponent,
    RequestConfirmationComponent,
    RequestResultComponent,
    SellerOrderDetailComponent,
    RequestCodeConfirmationComponent,
    GalleryComponent,
    UploadImgComponent,
    NewOffPeakProductComponent,
    SalesSummaryComponent,
    DragDropDirective,
    AddStaffComponent,
    StaffsComponent,
    ManageStaffAccessComponent,
    AccessDeniedComponent,
    EditShopComponent,
    ProfileComponent,
  ],
  entryComponents: [
    RequestConfirmationComponent,
    RequestCodeConfirmationComponent,
    RequestResultComponent,
  ],
  providers: [
    UserService,
    ShopsService,
    GeocoderService,
    UploadService,
    TransactionService,
    ShopResolverService,
    MarkupResolverService,
    GalleryResolverService,
    StateResolverService,
    ShopByIdResolverService,
    SellerOrderResolverService,
    ProfileResolverService,
    StaffResolverService,
    FeaturesResolverService,
    UserFeaturesResolverService,
    SellerSummaryResolverService,
    RevenuRprtResolverService,
    StateService,
  ],
})
export class SellerModule {}
