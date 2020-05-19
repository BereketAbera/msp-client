import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BuyerAdminComponent } from "./buyer-admin.component";
import { BuyerDashboardComponent } from "./buyer-dashboard/buyer-dashboard.component";
import { BuyerTransactionsComponent } from "./buyer-transactions/buyer-transactions.component";
import { PaymentHomeComponent } from "./payment-home/payment-home.component";
import { BalanceResolverService } from "../service/balance-resolver.service";
import { CreditCardsResolverService } from "../service/credit-cards-resolver.service";
import { ProductResolverService } from "../service/product-resolver.service";
import { BuyerItemQrcodeComponent } from "./buyer-item-qrcode/buyer-item-qrcode.component";
import { TransactionResolverService } from "../service/transaction-resolver.service";
import { TransactionStatusResolverService } from "../service/transaction-status-resolver.service";
import { BuyerSupplierResolverService } from "../service/buyer-supplier-resolver.service";
import { BuyerDepositResolverService } from "../service/buyer-deposit-resolver.service";
import { BuyerOrderResolverService } from "../service/buyer-order-resolver.service";
import { BuyerOrdersComponent } from "./buyer-orders/buyer-orders.component";
import { BuyerDepositComponent } from "./buyer-deposit/buyer-deposit.component";
import { BuyerDepositDetailComponent } from "./buyer-deposit-detail/buyer-deposit-detail.component";
import { BuyerOrderDetailComponent } from "./buyer-order-detail/buyer-order-detail.component";
import { OrdersResolverService } from "../service/orders-resolver.service";
import { ReferComponent } from "./refer/refer.component";

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
        },
      },
      {
        path: "",
        component: BuyerOrdersComponent,
        resolve: { orders: OrdersResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(buyerRoutes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
