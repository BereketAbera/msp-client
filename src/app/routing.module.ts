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

const appRoutes: Routes = [
  {
    path: "",
    component: PublicComponent,
    canActivate: [HomeGuard],
    children: [
      {
        path: "deal/:id",
        component: DealDetailComponent,
        resolve: {
          product: ProductResolverService,
          mspMarkup: MspMarkupResolverService
        }
      },
      {
        path: "utcdeal/:id/:utctime",
        component: UtcDealDetailComponent,
        resolve: {
          product: ProductResolverService,
          mspMarkup: MspMarkupResolverService
        }
      },
      {
        path: "",
        component: HomeComponent,
        resolve: {
          categories: SubCategoryResolverService
        },
        runGuardsAndResolvers: "always"
      },
      { path: "cart", component: CartComponent },
      { path: "food", component: HomeComponent },
      { path: "beauty", component: BeautyComponent },
      { path: "test", component: TestUtcComponent }
    ]
  },
  {
    path: "",
    loadChildren: "./auth/auth.module#AuthModule"
  },
  {
    path: "tlgu-slr",
    canActivate: [SellerGuard],
    loadChildren: "./seller-admin/seller.module#SellerModule"
  },
  {
    path: "tlgu-byr",
    canActivate: [BuyerGuard],
    loadChildren: "./buyer-admin/buyer.module#BuyerModule"
  },
  {
    path: "tlgu-admin",
    canActivate: [AdminGuard],
    loadChildren: "./system-admin/system-admin.module#SystemAdminModule"
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: "reload" })
  ],
  declarations: []
})
export class RoutingModule {}