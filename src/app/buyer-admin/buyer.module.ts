import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { CreditCardDirectivesModule } from "angular-cc-library";
import { BalanceResolverService } from "../service/balance-resolver.service";
import { BuyerDepositResolverService } from "../service/buyer-deposit-resolver.service";
import { BuyerOrderResolverService } from "../service/buyer-order-resolver.service";
import { BuyerSupplierResolverService } from "../service/buyer-supplier-resolver.service";
import { CreditCardsResolverService } from "../service/credit-cards-resolver.service";
import { OrdersResolverService } from "../service/orders-resolver.service";
import { TransactionResolverService } from "../service/transaction-resolver.service";
import { TransactionStatusResolverService } from "../service/transaction-status-resolver.service";
import { TransactionService } from "../service/transaction.service";
import { UserProfileResolverService } from "../service/user-profile-resolver.service";
import { UserService } from "../service/user.service";
import { SharedModule } from "../shared/shared.module";
import { BuyerAdminComponent } from "./buyer-admin.component";
import { BuyerConsentComponent } from "./buyer-consent/buyer-consent.component";
import { BuyerDashboardComponent } from "./buyer-dashboard/buyer-dashboard.component";
import { BuyerDepositDetailComponent } from "./buyer-deposit-detail/buyer-deposit-detail.component";
import { BuyerDepositComponent } from "./buyer-deposit/buyer-deposit.component";
import { BuyerItemQrcodeComponent } from "./buyer-item-qrcode/buyer-item-qrcode.component";
import { BuyerNavigationComponent } from "./buyer-navigation/buyer-navigation.component";
import { BuyerOrderDetailComponent } from "./buyer-order-detail/buyer-order-detail.component";
import { BuyerOrdersComponent } from "./buyer-orders/buyer-orders.component";
import { BuyerRoutingModule } from "./buyer-routing.module";
// import { CreditCardDirectivesModule } from "angular-cc-library";
import { BuyerTransactionsComponent } from "./buyer-transactions/buyer-transactions.component";
import { DepositeWithNewCreditCardComponent } from "./deposite-with-new-credit-card/deposite-with-new-credit-card.component";
import { DepositeWithSavedCreditCardComponent } from "./deposite-with-saved-credit-card/deposite-with-saved-credit-card.component";
import { PaymentHomeComponent } from "./payment-home/payment-home.component";
import { PaymentTypeDirective } from "./payment-type/payment-type.directive";
import { PaymentWithBalanceComponent } from "./payment-with-balance/payment-with-balance.component";
import { PaymentWithCreditCardComponent } from "./payment-with-credit-card/payment-with-credit-card.component";
import { PaymentWithSavedCreditCardComponent } from "./payment-with-saved-credit-card/payment-with-saved-credit-card.component";
import { ProfileComponent } from "./profile/profile.component";
import { ReferBuyerComponent } from "./refer-buyer/refer-buyer.component";
import { ReferSellerComponent } from "./refer-seller/refer-seller.component";
import { ReferStatusComponent } from "./refer-status/refer-status.component";
import { ReferComponent } from "./refer/refer.component";
import { SocialReferralComponent } from "./social-referral/social-referral.component";
import { SocialReferralsComponent } from './social-referrals/social-referrals.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    CreditCardDirectivesModule,
    SharedModule,
    BuyerRoutingModule,
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
    ReferStatusComponent,
    ProfileComponent,
    SocialReferralComponent,
    SocialReferralsComponent,
  ],
  entryComponents: [
    PaymentWithCreditCardComponent,
    PaymentWithBalanceComponent,
    PaymentWithSavedCreditCardComponent,
    DepositeWithNewCreditCardComponent,
    DepositeWithSavedCreditCardComponent,
  ],
  providers: [
    TransactionService,
    UserService,
    TransactionResolverService,
    BuyerSupplierResolverService,
    TransactionStatusResolverService,
    BalanceResolverService,
    CreditCardsResolverService,
    BuyerOrderResolverService,
    BuyerDepositResolverService,
    OrdersResolverService,
    UserProfileResolverService,
  ],
})
export class BuyerModule {}
