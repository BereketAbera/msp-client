import { AddAssistantsComponent } from "./add-assistants/add-assistants.component";
import { AssistantsComponent } from "./assistants/assistants.component";
import { ReferralLinkServiceService } from "./../service/referral-link-service.service";
import { LinksComponent } from "./links/links.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { StateResolverService } from "../service/state-resolver.service";
import { StateService } from "../service/state.service";
import { UserService } from "../service/user.service";
import { SharedModule } from "../shared/shared.module";
import { SellerInfoResolverService } from "../_resolvers/seller-info-resolver.service";
import { AdminNavigationComponent } from "./admin-navigation/admin-navigation.component";
import { AdminRoutingModule } from "./admin.routing.module";
import { BuyersComponent } from "./buyers/buyers.component";
import { CodesDetailComponent } from "./codes-detail/codes-detail.component";
import { CodesComponent } from "./codes/codes.component";
import { ConfigComponent } from "./config/config.component";
import { SellerDetailComponent } from "./seller-detail/seller-detail.component";
import { SystemAdminComponent } from "./system-admin.component";
import { UsersAdminComponent } from "./users-admin/users-admin.component";

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
    LinksComponent,
    AssistantsComponent,
    AddAssistantsComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, AdminRoutingModule],
  providers: [
    UserService,
    StateService,
    StateResolverService,
    SellerInfoResolverService,
    ReferralLinkServiceService
  ]
})
export class SystemAdminModule {}
