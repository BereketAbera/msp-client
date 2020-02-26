import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SystemAdminComponent } from './system-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
var SystemAdminModule = /** @class */ (function () {
    function SystemAdminModule() {
    }
    SystemAdminModule = tslib_1.__decorate([
        NgModule({
            declarations: [SystemAdminComponent, UsersAdminComponent, AdminNavigationComponent],
            imports: [
                CommonModule,
                ReactiveFormsModule,
                SharedModule,
                AdminRoutingModule
            ]
        })
    ], SystemAdminModule);
    return SystemAdminModule;
}());
export { SystemAdminModule };
//# sourceMappingURL=system-admin.module.js.map