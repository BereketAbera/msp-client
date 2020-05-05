import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SystemAdminComponent } from "./system-admin.component";

import { UsersAdminComponent } from "./users-admin/users-admin.component";

import { AdminGuard } from "./admin.guard";
import { StateResolverService } from '../service/state-resolver.service';

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
        resolve:{
          states: StateResolverService,
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(sellerRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
