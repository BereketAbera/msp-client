import { BuyerHomeComponent } from "./components/buyer-home/buyer-home.component";
import { SellerHomeComponent } from "./components/seller-home/seller-home.component";
// import { StafferGuard } from "./staffer.guard";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { BuyerGuard } from "./buyer-admin/buyer.guard";
import { BuyerTermsComponent } from "./components/buyer-terms/buyer-terms.component";
import { CartComponent } from "./components/cart/cart.component";
import { DealDetailComponent } from "./components/deal-detail/deal-detail.component";
import { HomeComponent } from "./components/home/home.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { PublicProductsComponent } from "./components/public-products/public-products.component";
import { PublicComponent } from "./components/public/public.component";
import { RefundComponent } from "./components/refund/refund.component";
import { SellerTermsComponent } from "./components/seller-terms/seller-terms.component";
import { HomeGuard } from "./home.guard";
// import { SellerGuard } from "./seller-admin/seller.guard";
import { CustomPreloadingService } from "./service/custom-preloading.service";
import { MspMarkupResolverService } from "./service/msp-markup-resolver.service";
import { ProductResolverService } from "./service/product-resolver.service";
import { SubCategoryResolverService } from "./service/sub-category-resolver.service";
import { AdminGuard } from "./system-admin/admin.guard";

const appRoutes: Routes = [
  {
    path: "",
    component: PublicComponent,
    data: { preload: true },
    resolve: {
      categories: SubCategoryResolverService,
    },
    children: [
      {
        path: "products",
        component: PublicProductsComponent,
        resolve: {
          categories: SubCategoryResolverService,
        },
      },
      {
        path: "deal/:id",
        component: DealDetailComponent,
        resolve: {
          product: ProductResolverService,
          mspMarkup: MspMarkupResolverService,
        },
      },
      {
        path: "",
        component: HomeComponent,
        canActivate: [HomeGuard],
        resolve: {
          categories: SubCategoryResolverService,
        },
      },
      { path: "cart", component: CartComponent },
      { path: "privacy", component: PrivacyComponent },
      { path: "buyer_terms", component: BuyerTermsComponent },
      { path: "seller_terms", component: SellerTermsComponent },
      { path: "refund", component: RefundComponent },
      { path: "seller", component: SellerHomeComponent },
      { path: "buyer", component: BuyerHomeComponent },
    ],
  },
  {
    path: "",
    canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "tlgu-slr",
    // canActivate: [],
    loadChildren: () =>
      import("./seller-admin/seller.module").then((m) => m.SellerModule),
  },
  {
    path: "tlgu-byr",
    canActivate: [BuyerGuard],
    loadChildren: () =>
      import("./buyer-admin/buyer.module").then((m) => m.BuyerModule),
  },
  {
    path: "tlgu-admin",
    canActivate: [AdminGuard],
    loadChildren: () =>
      import("./system-admin/system-admin.module").then(
        (m) => m.SystemAdminModule
      ),
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: CustomPreloadingService,
      onSameUrlNavigation: "reload",
      scrollPositionRestoration: "top",
    }),
  ],
  declarations: [],
})
export class RoutingModule {}
