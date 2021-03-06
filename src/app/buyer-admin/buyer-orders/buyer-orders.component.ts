import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Transaction } from "src/app/model/transaction";
import { TransactionsDataSource } from "../../service/transaction-data-source.service";
import { TransactionService } from "../../service/transaction.service";
import * as moment from "moment";

@Component({
  templateUrl: "./buyer-orders.component.html",
  styleUrls: ["./buyer-orders.component.scss"]
})
export class BuyerOrdersComponent implements OnInit {
  orders: Transaction[];
  dataSource: TransactionsDataSource;
  qrCode;
  count;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.route.data.subscribe((data: { orders: Transaction[] }) => {
      this.orders = data.orders;
      // console.log(this.orders);
      this.count = this.transactionService.countSubject.value;
    });
  }

  getStatus(transaction: Transaction) {
    let prdPickupEndTime = new Date(transaction.product.pickupEndTime);
    let purchaseTime = new Date(transaction.purchaseTime);
    let pickupEndTime = new Date(
      purchaseTime.getFullYear(),
      purchaseTime.getMonth(),
      purchaseTime.getDate(),
      prdPickupEndTime.getHours(),
      prdPickupEndTime.getMinutes(),
      prdPickupEndTime.getSeconds()
    ).getTime();

    let status = "Pending";
    if (transaction.isScanneded) {
      if (transaction.status == 1) {
        status = "Processed";
      } else if (transaction.status == 2) {
        status = "Rejected";
      } else {
        status = pickupEndTime < Date.now() ? "Rejected" : "Pending";
      }
    } else {
      status = pickupEndTime < Date.now() ? "Expired" : "Pending";
    }
    return status;
  }
  gotoAddNewProduct() {
    this.router.navigate(["./nwadtlgu"], { relativeTo: this.route });
  }
  showOrders() {
    if (this.orders.length > 0) return true;
    return false;
  }

  changeToLocal12Hours(time) {
    let d = -new Date().getTimezoneOffset();
    // console.log(d);
    let x = time.split(":");
    let hour = parseInt(x[0]);
    let minute = parseInt(x[1]);
    let totalMinutes = hour * 60 + minute + d;
    let tempTotalMinutes = totalMinutes;
    totalMinutes = totalMinutes < 0 ? 24 * 60 + totalMinutes : totalMinutes;
    hour = Math.floor(totalMinutes / 60);
    minute = totalMinutes % 60;

    // console.log(hour);
    let value = "";
    if (hour < 12) {
      value = `${this.returnTwoDigit(hour)}:${this.returnTwoDigit(minute)}AM`;
    } else if (hour == 12) {
      value = `${this.returnTwoDigit(12)}:${this.returnTwoDigit(minute)}PM`;
    } else if (hour > 24) {
      value = `${this.returnTwoDigit(hour - 24)}:${this.returnTwoDigit(minute)}AM`;
    } else if (hour == 24) {
      value = `${this.returnTwoDigit(12)}:${this.returnTwoDigit(minute)}AM`;
    } else {
      value = `${this.returnTwoDigit(hour % 12)}:${this.returnTwoDigit(minute)}PM`;
    }
    return value;
  }

  returnTwoDigit(value) {
    return value.toString().length == 1 ? "0" + value : value;
  }

  getServerData(event) {
    this.transactionService
      .listTransactions(1, "", "", event.pageIndex, event.pageSize)
      .subscribe((data) => {
        window.scroll(0, 0);
        this.orders = data;
      });
    // console.log(event);
  }

  getOrderStatus(order) {
    if (order.status) {
      return "Processed";
    } else {
      let pDate = order.purchaseTime.split("T")[0];
      let utcDate = new Date().toISOString().split("T")[0];
      return pDate == utcDate ? "Pending" : "Expired";
    }
  }

  phoneChangeFormat(value, type) {
    if (type == "db") {
      return "+1" + value.replace(/[()-\s]/g, "");
    } else {
      let v = value.replace("+1", "").replace(/[()-\s]/g, "");
      return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
    }
  }

  // addOffset(time) {
  //   console.log(time);

  //   return moment(time)
  //     .subtract(new Date().getTimezoneOffset(), "minutes")
  //     .toISOString();
  // }
}
