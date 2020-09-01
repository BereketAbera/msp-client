import { SocialReferralsComponent } from "./social-referrals/social-referrals.component";
import { ReferStatusComponent } from "./refer-status/refer-status.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BalanceResolverService } from "../service/balance-resolver.service";
import { BuyerDepositResolverService } from "../service/buyer-deposit-resolver.service";
import { BuyerOrderResolverService } from "../service/buyer-order-resolver.service";
import { BuyerSupplierResolverService } from "../service/buyer-supplier-resolver.service";
import { CreditCardsResolverService } from "../service/credit-cards-resolver.service";
import { OrdersResolverService } from "../service/orders-resolver.service";
import { TransactionResolverService } from "../service/transaction-resolver.service";
import { TransactionStatusResolverService } from "../service/transaction-status-resolver.service";
import { UserProfileResolverService } from "../service/user-profile-resolver.service";
import { BuyerAdminComponent } from "./buyer-admin.component";
import { BuyerDepositDetailComponent } from "./buyer-deposit-detail/buyer-deposit-detail.component";
import { BuyerDepositComponent } from "./buyer-deposit/buyer-deposit.component";
import { BuyerItemQrcodeComponent } from "./buyer-item-qrcode/buyer-item-qrcode.component";
import { BuyerOrderDetailComponent } from "./buyer-order-detail/buyer-order-detail.component";
import { BuyerOrdersComponent } from "./buyer-orders/buyer-orders.component";
import { BuyerTransactionsComponent } from "./buyer-transactions/buyer-transactions.component";
import { PaymentHomeComponent } from "./payment-home/payment-home.component";
import { ProfileComponent } from "./profile/profile.component";
import { ReferComponent } from "./refer/refer.component";
import { ConfirmCodeComponent } from "./confirm-code/confirm-code.component";

const buyerRoutes: Routes = [
  {
    path: "",
    component: BuyerAdminComponent,
    children: [
      {
        path: "prdcts/:id",
        component: BuyerItemQrcodeComponent,
        resolve: {
          transaction: TransactionResolverService,
          supplier: BuyerSupplierResolverService,
          transStatus: TransactionStatusResolverService,
        },
      },
      {
        path: "trnsctns",
        component: BuyerTransactionsComponent,
        resolve: { balance: BalanceResolverService },
      },
      {
        path: "deposit",
        component: BuyerDepositComponent,
        resolve: {
          balance: BalanceResolverService,
          creditCards: CreditCardsResolverService,
        },
      },
      { path: "rfr", component: ReferComponent },
      { path: "rfr/email_referral", component: ReferStatusComponent },
      { path: "rfr/social_referral", component: SocialReferralsComponent },
      {
        path: "trnsctns/:id",
        component: BuyerOrderDetailComponent,
        resolve: {
          order: BuyerOrderResolverService,
          supplier: BuyerSupplierResolverService,
        },
      },
      {
        path: "deposit/:id",
        component: BuyerDepositDetailComponent,
        resolve: { deposit: BuyerDepositResolverService },
      },
      {
        path: "payment/:id",
        component: PaymentHomeComponent,
        resolve: {
          balance: BalanceResolverService,
          creditCards: CreditCardsResolverService,
          profile: UserProfileResolverService,
        },
      },
      {
        path: "profile",
        component: ProfileComponent,
        resolve: {
          profile: UserProfileResolverService,
        },
      },
      {
        path: "confirm_phonenumber_code",
        component: ConfirmCodeComponent,
      },
      {
        path: "",
        component: BuyerOrdersComponent,
        resolve: {
          orders: OrdersResolverService,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(buyerRoutes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
