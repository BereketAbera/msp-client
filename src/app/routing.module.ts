import { RefundComponent } from "./components/refund/refund.component";
import { SellerTermsComponent } from "./components/seller-terms/seller-terms.component";
import { BuyerTermsComponent } from "./components/buyer-terms/buyer-terms.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { PublicProductsComponent } from "./components/public-products/public-products.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { BeautyComponent } from "./components/beauty/beauty.component";
import { OthersComponent } from "./components/others/others.component";
import { DealDetailComponent } from "./components/deal-detail/deal-detail.component";
import { PublicComponent } from "./components/public/public.component";
import { CartComponent } from "./components/cart/cart.component";

import { ProductResolverService } from "./service/product-resolver.service";
import { SubCategoryResolverService } from "./service/sub-category-resolver.service";
import { MspMarkupResolverService } from "./service/msp-markup-resolver.service";
import { TestUtcComponent } from "./components/test-utc/test-utc.component";
import { UtcDealDetailComponent } from "./components/utc-deal-detail/utc-deal-detail.component";
import { HomeGuard } from "./home.guard";
import { SellerGuard } from "./seller-admin/seller.guard";
import { BuyerGuard } from "./buyer-admin/buyer.guard";
import { AdminGuard } from "./system-admin/admin.guard";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  {
    path: "",
    component: PublicComponent,
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
        path: "utcdeal/:id/:utctime",
        component: UtcDealDetailComponent,
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
        runGuardsAndResolvers: "always",
      },
      { path: "cart", component: CartComponent },
      { path: "food", component: HomeComponent },
      { path: "beauty", component: BeautyComponent },
      { path: "test", component: TestUtcComponent },
      { path: "privacy", component: PrivacyComponent },
      { path: "buyer_terms", component: BuyerTermsComponent },
      { path: "seller_terms", component: SellerTermsComponent },
      { path: "refund", component: RefundComponent },
    ],
  },
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: "./auth/auth.module#AuthModule",
  },
  {
    path: "tlgu-slr",
    canActivate: [SellerGuard],
    loadChildren: "./seller-admin/seller.module#SellerModule",
  },
  {
    path: "tlgu-byr",
    canActivate: [BuyerGuard],
    loadChildren: "./buyer-admin/buyer.module#BuyerModule",
  },
  {
    path: "tlgu-admin",
    canActivate: [AdminGuard],
    loadChildren: "./system-admin/system-admin.module#SystemAdminModule",
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: "reload" }),
  ],
  declarations: [],
})
export class RoutingModule {}
