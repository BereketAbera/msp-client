import { CodesDetailComponent } from "./codes-detail/codes-detail.component";
import { ConfigComponent } from "./config/config.component";
import { CodesComponent } from "./codes/codes.component";
import { BuyersComponent } from "./buyers/buyers.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";

import { SystemAdminComponent } from "./system-admin.component";
import { UsersAdminComponent } from "./users-admin/users-admin.component";

import { AdminRoutingModule } from "./admin.routing.module";
import { AdminNavigationComponent } from "./admin-navigation/admin-navigation.component";
import { SellerDetailComponent } from "./seller-detail/seller-detail.component";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";
import { StateResolverService } from "../service/state-resolver.service";
import { SellerInfoResolverService } from "../_resolvers/seller-info-resolver.service";
import { StateService } from "../service/state.service";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    SystemAdminComponent,
    UsersAdminComponent,
    AdminNavigationComponent,
    SellerDetailComponent,
    BuyersComponent,
    CodesComponent,
    ConfigComponent,
    CodesDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
    MatDialogModule
  ],
  providers: [
    UserService,
    StateService,
    StateResolverService,
    SellerInfoResolverService,
  ],
})
export class SystemAdminModule {}
