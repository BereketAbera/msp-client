import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DealDetailComponent } from './components/deal-detail/deal-detail.component';
import { PublicComponent } from './components/public/public.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductResolverService } from './service/product-resolver.service';
import { MspMarkupResolverService } from './service/msp-markup-resolver.service';
import { HomeGuard } from './home.guard';
var appRoutes = [
    {
        path: '',
        component: PublicComponent,
        canActivate: [HomeGuard],
        children: [
            {
                path: 'deal/:id',
                component: DealDetailComponent,
                resolve: { product: ProductResolverService, mspMarkup: MspMarkupResolverService }
            },
            { path: '', component: HomeComponent },
            { path: 'cart', component: CartComponent },
            { path: 'food', component: HomeComponent },
            { path: 'beauty', component: HomeComponent },
            { path: 'others', component: HomeComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
var RoutingModule = /** @class */ (function () {
    function RoutingModule() {
    }
    RoutingModule = tslib_1.__decorate([
        NgModule({
            exports: [RouterModule],
            imports: [
                CommonModule,
                RouterModule.forRoot(appRoutes)
            ],
            declarations: []
        })
    ], RoutingModule);
    return RoutingModule;
}());
export { RoutingModule };
//# sourceMappingURL=routing.module.js.map