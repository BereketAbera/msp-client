import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";

import { SystemAdminComponent } from "./system-admin.component";
import { UsersAdminComponent } from "./users-admin/users-admin.component";

import { AdminRoutingModule } from "./admin.routing.module";
import { AdminNavigationComponent } from "./admin-navigation/admin-navigation.component";
import { SellerDetailComponent } from './seller-detail/seller-detail.component';

@NgModule({
  declarations: [
    SystemAdminComponent,
    UsersAdminComponent,
    AdminNavigationComponent,
    SellerDetailComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, AdminRoutingModule]
})
export class SystemAdminModule {}
