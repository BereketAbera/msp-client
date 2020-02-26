import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemAdminComponent } from './system-admin.component';

import {UsersAdminComponent} from './users-admin/users-admin.component';


import { AdminGuard } from './admin.guard';


const sellerRoutes: Routes = [
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

@NgModule({
    imports: [
        RouterModule.forChild(sellerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }