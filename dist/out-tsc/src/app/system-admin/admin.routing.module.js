import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SystemAdminComponent } from './system-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { AdminGuard } from './admin.guard';
var sellerRoutes = [
    {
        path: 'tlgu-admin',
        component: SystemAdminComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: '',
                canActivateChild: [AdminGuard],
                children: [
                    {
                        path: '',
                        component: UsersAdminComponent
                    }
                ]
            }
        ]
    }
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forChild(sellerRoutes)
            ],
            exports: [
                RouterModule
            ]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());
export { AdminRoutingModule };
//# sourceMappingURL=admin.routing.module.js.map