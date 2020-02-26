import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerAdminComponent } from './seller-admin.component';
import { AddNewAdComponent } from './add-new-ad/add-new-ad.component';
import { NewShopComponent } from './new-shop/new-shop.component';
import {NewOffPeakProductComponent} from './new-off-peak-product/new-off-peak-product.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { ProductsComponent } from './products/products.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { SellerOrderDetailComponent } from './seller-order-detail/seller-order-detail.component';
import {GalleryComponent} from './gallery/gallery.component';
import {UploadImgComponent} from './upload-img/upload-img.component';
import {SalesSummaryComponent} from './sales-summary/sales-summary.component';

import { ShopResolverService } from '../service/shop-resolver.service';
import { CategoryResolverService } from '../service/category-resolver.service';
import { SubCategoryResolverService } from '../service/sub-category-resolver.service';
import { SellerSummaryResolverService } from '../service/seller-summary-resolver.service';
import { SellerOrderResolverService } from '../service/seller-order-resolver.service';
import { MarkupResolverService } from '../service/markup-resolver.service';
import { RevenuRprtResolverService } from '../service/revenu-rprt-resolver.service';
import {GalleryResolverService} from '../service/gallery-resolver.service';
import {StateResolverService} from '../service/state-resolver.service';

import { SellerGuard } from './seller.guard';
import { Transaction } from '../model/transaction';

const sellerRoutes: Routes = [
    {
        path: 'tlgu-slr',
        component: SellerAdminComponent,
        canActivate: [SellerGuard],
        children: [
            {
                path: '',
                canActivateChild: [SellerGuard],

                children: [
                    {
                        path: 'prdcts/nwoffpktlgu',
                        component: NewOffPeakProductComponent,
                        resolve: {
                            shops: ShopResolverService,
                            categories: SubCategoryResolverService,
                            markup: MarkupResolverService,
                            pictures: GalleryResolverService
                           
                        },
                    },
                    {
                        path: 'prdcts/nwclsngtlgu',
                        component: AddNewAdComponent,
                        resolve: {
                            shops: ShopResolverService,
                            categories: SubCategoryResolverService,
                            markup: MarkupResolverService,
                            pictures: GalleryResolverService
                           
                        },
                    },
                    
                    { path: 'shops/:newshp', component: NewShopComponent,resolve: {
                        states: StateResolverService
                    } },
                    { path: 'trnsctns', component: TransactionsComponent },
                    { path: 'trnsctns/:id', component: SellerOrderDetailComponent, resolve: { order: SellerOrderResolverService } },
                    {path:'slssmry',component:SalesSummaryComponent},
                    { path: 'prdcts', component: ProductsComponent },
                    {
                        path: 'gallery',
                        component: GalleryComponent,
                        resolve: {
                            pictures: GalleryResolverService
                        },
                    },
                    { path: 'gallery/:upldimg', component: UploadImgComponent },
                    { path: 'qr-scanner', component: QrScannerComponent },
                    { path: 'shops', component: ShopListComponent },
                    {
                        path: '', component: SellerDashboardComponent, resolve: {
                            summary: SellerSummaryResolverService, rvnuRprt: RevenuRprtResolverService

                        }
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
export class SellerRoutingModule { }