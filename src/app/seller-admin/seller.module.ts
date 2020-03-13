import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'


import {SharedModule} from '../shared/shared.module';

import {SellerRoutingModule} from './seller-routing.module';
import { SellerAdminComponent } from './seller-admin.component';
import {AddNewAdComponent} from './add-new-ad/add-new-ad.component';
import {NewShopComponent} from './new-shop/new-shop.component';
import {ShopListComponent} from './shop-list/shop-list.component';
import {SellerDashboardComponent} from './seller-dashboard/seller-dashboard.component';
import {NavigationComponent} from  './navigation/navigation.component';
import { ProductsComponent } from './products/products.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RequestConfirmationComponent } from './request-confirmation/request-confirmation.component';
import { RequestResultComponent } from './request-result/request-result.component';
import { SellerOrderDetailComponent } from './seller-order-detail/seller-order-detail.component';
import { RequestCodeConfirmationComponent } from './request-code-confirmation/request-code-confirmation.component';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { NewOffPeakProductComponent } from './new-off-peak-product/new-off-peak-product.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { DragDropDirective  } from '../service/drag-drop.directive'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SellerRoutingModule
  ],
  declarations: [
    NavigationComponent,
    SellerAdminComponent,
    AddNewAdComponent,
    NewShopComponent,
    ShopListComponent,
    SellerDashboardComponent,
    ProductsComponent,
    TransactionsComponent,
    QrScannerComponent,
    RequestConfirmationComponent,
    RequestResultComponent,
    SellerOrderDetailComponent,
    RequestCodeConfirmationComponent,
    GalleryComponent,
    UploadImgComponent,
    NewOffPeakProductComponent,
    SalesSummaryComponent,
    DragDropDirective
    
  ],
  entryComponents:[
    RequestConfirmationComponent,
    RequestCodeConfirmationComponent,
    RequestResultComponent
  ]
})
export class SellerModule { }
