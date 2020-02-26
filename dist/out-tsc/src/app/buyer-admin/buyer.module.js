import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerNavigationComponent } from './buyer-navigation/buyer-navigation.component';
import { BuyerAdminComponent } from './buyer-admin.component';
import { BuyerDashboardComponent } from './buyer-dashboard/buyer-dashboard.component';
import { PaymentHomeComponent } from './payment-home/payment-home.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { BuyerTransactionsComponent } from './buyer-transactions/buyer-transactions.component';
import { BuyerItemQrcodeComponent } from './buyer-item-qrcode/buyer-item-qrcode.component';
import { BuyerOrdersComponent } from './buyer-orders/buyer-orders.component';
import { BuyerDepositComponent } from './buyer-deposit/buyer-deposit.component';
import { PaymentWithCreditCardComponent } from './payment-with-credit-card/payment-with-credit-card.component';
import { PaymentWithSavedCreditCardComponent } from './payment-with-saved-credit-card/payment-with-saved-credit-card.component';
import { PaymentWithBalanceComponent } from './payment-with-balance/payment-with-balance.component';
import { PaymentTypeDirective } from './payment-type/payment-type.directive';
import { DepositeWithNewCreditCardComponent } from './deposite-with-new-credit-card/deposite-with-new-credit-card.component';
import { DepositeWithSavedCreditCardComponent } from './deposite-with-saved-credit-card/deposite-with-saved-credit-card.component';
import { BuyerOrderDetailComponent } from './buyer-order-detail/buyer-order-detail.component';
import { BuyerDepositDetailComponent } from './buyer-deposit-detail/buyer-deposit-detail.component';
import { BuyerConsentComponent } from './buyer-consent/buyer-consent.component';
import { ReferComponent } from './refer/refer.component';
import { ReferSellerComponent } from './refer-seller/refer-seller.component';
import { ReferBuyerComponent } from './refer-buyer/refer-buyer.component';
import { ReferStatusComponent } from './refer-status/refer-status.component';
var BuyerModule = /** @class */ (function () {
    function BuyerModule() {
    }
    BuyerModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule,
                MatFormFieldModule,
                MatTabsModule,
                MatInputModule,
                CreditCardDirectivesModule,
                SharedModule,
                BuyerRoutingModule
            ],
            declarations: [
                BuyerNavigationComponent,
                BuyerAdminComponent,
                BuyerDashboardComponent,
                PaymentHomeComponent,
                BuyerTransactionsComponent,
                BuyerItemQrcodeComponent,
                BuyerOrdersComponent,
                BuyerDepositComponent,
                PaymentWithCreditCardComponent,
                PaymentWithSavedCreditCardComponent,
                PaymentWithBalanceComponent,
                PaymentTypeDirective,
                DepositeWithNewCreditCardComponent,
                DepositeWithSavedCreditCardComponent,
                BuyerOrderDetailComponent,
                BuyerDepositDetailComponent,
                BuyerConsentComponent,
                ReferComponent,
                ReferSellerComponent,
                ReferBuyerComponent,
                ReferStatusComponent
            ],
            entryComponents: [
                PaymentWithCreditCardComponent,
                PaymentWithBalanceComponent,
                PaymentWithSavedCreditCardComponent,
                DepositeWithNewCreditCardComponent,
                DepositeWithSavedCreditCardComponent
            ]
        })
    ], BuyerModule);
    return BuyerModule;
}());
export { BuyerModule };
//# sourceMappingURL=buyer.module.js.map