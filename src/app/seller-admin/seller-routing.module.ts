import { WaitingAdminComponent } from "./waiting-admin/waiting-admin.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeaturesResolverService } from "../service/features-resolver.service";
import { GalleryResolverService } from "../service/gallery-resolver.service";
import { MarkupResolverService } from "../service/markup-resolver.service";
import { ProfileResolverService } from "../service/profile-resolver.service";
import { RevenuRprtResolverService } from "../service/revenu-rprt-resolver.service";
import { SellerOrderResolverService } from "../service/seller-order-resolver.service";
import { SellerSummaryResolverService } from "../service/seller-summary-resolver.service";
import { ShopByIdResolverService } from "../service/shop-by-id-resolver.service";
import { ShopResolverService } from "../service/shop-resolver.service";
import { StaffResolverService } from "../service/staff-resolver.service";
import { StateResolverService } from "../service/state-resolver.service";
import { SubCategoryResolverService } from "../service/sub-category-resolver.service";
import { UserFeaturesResolverService } from "./../service/user-features-resolver.service";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { AddNewAdComponent } from "./add-new-ad/add-new-ad.component";
import { AddStaffComponent } from "./add-staff/add-staff.component";
import { EditShopComponent } from "./edit-shop/edit-shop.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { ManageStaffAccessComponent } from "./manage-staff-access/manage-staff-access.component";
import { NewOffPeakProductComponent } from "./new-off-peak-product/new-off-peak-product.component";
import { NewShopComponent } from "./new-shop/new-shop.component";
import { ProductsComponent } from "./products/products.component";
import { ProfileComponent } from "./profile/profile.component";
import { QrScannerComponent } from "./qr-scanner/qr-scanner.component";
import { SalesSummaryComponent } from "./sales-summary/sales-summary.component";
import { SellerAdminComponent } from "./seller-admin.component";
import { SellerDashboardComponent } from "./seller-dashboard/seller-dashboard.component";
import { SellerOrderDetailComponent } from "./seller-order-detail/seller-order-detail.component";
import { SellerGuard } from "./seller.guard";
import { ShopListComponent } from "./shop-list/shop-list.component";
import { StaffsComponent } from "./staffs/staffs.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { UploadImgComponent } from "./upload-img/upload-img.component";

const sellerRoutes: Routes = [
  {
    path: "",
    component: SellerAdminComponent,

    children: [
      {
        path: "prdcts/nwoffpktlgu",
        canActivate: [SellerGuard],
        component: NewOffPeakProductComponent,
        resolve: {
          shops: ShopResolverService,
          categories: SubCategoryResolverService,
          markup: MarkupResolverService,
          pictures: GalleryResolverService,
        },
      },
      {
        path: "prdcts/nwoffpktlgu/edit/:id",
        canActivate: [SellerGuard],
        component: NewOffPeakProductComponent,
        resolve: {
          shops: ShopResolverService,
          categories: SubCategoryResolverService,
          markup: MarkupResolverService,
          pictures: GalleryResolverService,
        },
        data: { clone: false, edit: true },
      },
      {
        path: "prdcts/nwoffpktlgu/clone/:id",
        canActivate: [SellerGuard],
        component: NewOffPeakProductComponent,
        resolve: {
          shops: ShopResolverService,
          categories: SubCategoryResolverService,
          markup: MarkupResolverService,
          pictures: GalleryResolverService,
        },
        data: { clone: true, edit: false },
      },
      {
        path: "prdcts/nwclsngtlgu",
        canActivate: [SellerGuard],
        component: AddNewAdComponent,
        resolve: {
          shops: ShopResolverService,
          categories: SubCategoryResolverService,
          markup: MarkupResolverService,
          pictures: GalleryResolverService,
        },
      },

      {
        path: "shops/:newshp",
        canActivate: [SellerGuard],
        component: NewShopComponent,
        resolve: {
          states: StateResolverService,
          categories: SubCategoryResolverService,
        },
      },
      {
        path: "shops/edit/:id",
        canActivate: [SellerGuard],
        component: EditShopComponent,
        resolve: {
          states: StateResolverService,
          shop: ShopByIdResolverService,
        },
      },
      {
        path: "trnsctns",
        canActivate: [SellerGuard],
        component: TransactionsComponent,
      },
      {
        path: "trnscts/process",
        canActivate: [SellerGuard],
        component: QrScannerComponent,
      },
      {
        path: "trnsctns/:id",
        canActivate: [SellerGuard],
        component: SellerOrderDetailComponent,
        resolve: { order: SellerOrderResolverService },
      },
      {
        path: "slssmry",
        canActivate: [SellerGuard],
        component: SalesSummaryComponent,
      },
      {
        path: "prdcts",
        canActivate: [SellerGuard],
        component: ProductsComponent,
      },
      {
        path: "gallery",
        canActivate: [SellerGuard],
        component: GalleryComponent,
        resolve: {
          pictures: GalleryResolverService,
        },
      },
      {
        path: "gallery/:upldimg",
        canActivate: [SellerGuard],
        component: UploadImgComponent,
      },
      {
        path: "shops",
        canActivate: [SellerGuard],
        component: ShopListComponent,
      },
      {
        path: "profile",
        canActivate: [SellerGuard],
        component: ProfileComponent,
        resolve: { profile: ProfileResolverService },
      },
      {
        path: "staffs",
        canActivate: [SellerGuard],
        component: StaffsComponent,
        resolve: { staff: StaffResolverService },
      },
      {
        path: "staffs/add",
        canActivate: [SellerGuard],
        component: AddStaffComponent,
      },
      {
        path: "staffs/manage_access/:id",
        canActivate: [SellerGuard],
        component: ManageStaffAccessComponent,
        resolve: {
          features: FeaturesResolverService,
          user_features: UserFeaturesResolverService,
        },
      },
      {
        path: "",
        canActivate: [SellerGuard],
        component: SellerDashboardComponent,
        resolve: {
          summary: SellerSummaryResolverService,
          rvnuRprt: RevenuRprtResolverService,
        },
      },
      {
        path: "access_denied",
        component: AccessDeniedComponent,
      },
      {
        path: "waiting_admin_approval",
        component: WaitingAdminComponent,
      },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sellerRoutes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
