import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StateResolverService } from "../service/state-resolver.service";
import { SellerInfoResolverService } from "../_resolvers/seller-info-resolver.service";
import { BuyersComponent } from "./buyers/buyers.component";
import { CodesDetailComponent } from "./codes-detail/codes-detail.component";
import { CodesComponent } from "./codes/codes.component";
import { ConfigComponent } from "./config/config.component";
import { SellerDetailComponent } from "./seller-detail/seller-detail.component";
import { SystemAdminComponent } from "./system-admin.component";
import { UsersAdminComponent } from "./users-admin/users-admin.component";

// path: "tlgu-admin",
// component: SystemAdminComponent,
// canActivate: [AdminGuard],

const sellerRoutes: Routes = [
  {
    path: "",
    component: SystemAdminComponent,
    children: [
      {
        path: "",
        component: UsersAdminComponent,
        resolve: {
          states: StateResolverService,
        },
      },
      {
        path: "details/:id",
        component: SellerDetailComponent,
        resolve: {
          seller: SellerInfoResolverService,
        },
      },
      {
        path: "buyers",
        component: BuyersComponent,
        // resolve:{
        //   seller: SellerInfoResolverService
        // }
      },
      {
        path: "codes",
        component: CodesComponent,
        // resolve:{
        //   seller: SellerInfoResolverService
        // }
      },
      {
        path: "codes/detail/:code",
        component: CodesDetailComponent,
        // resolve:{
        //   seller: SellerInfoResolverService
        // }
      },
      {
        path: "config",
        component: ConfigComponent,
        // resolve:{
        //   seller: SellerInfoResolverService
        // }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sellerRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
