import { TransactionService } from "./../../service/transaction.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Transaction } from "../../model/transaction";
import { Location } from "@angular/common";

import * as moment from "moment";

@Component({
  selector: "app-seller-order-detail",
  templateUrl: "./seller-order-detail.component.html",
  styleUrls: ["./seller-order-detail.component.scss"],
})
export class SellerOrderDetailComponent implements OnInit {
  order: Transaction;
  show = false;
  now = moment().format("YYYY-MM-DD HH:mm:ss");
  pickupEndTime: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { order: Transaction }) => {
      this.order = data.order;
      this.pickupEndTime = moment(this.order.pickupEndTime).format(
        "YYYY-MM-DD HH:MM:SS"
      );
    });
  }
  gotoSellerTrans() {
    this.location.back();
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
      value = `${this.returnTwoDigit(hour - 24)}:${this.returnTwoDigit(
        minute
      )}AM`;
    } else if (hour == 24) {
      value = `${this.returnTwoDigit(12)}:${this.returnTwoDigit(minute)}AM`;
    } else {
      value = `${this.returnTwoDigit(hour % 12)}:${this.returnTwoDigit(
        minute
      )}PM`;
    }
    return value;
  }

  returnTwoDigit(value) {
    return value.toString().length == 1 ? "0" + value : value;
  }

  showPhoneNumber() {
    this.transactionService
      .processTakeOutTransaction(this.order.id)
      .subscribe((res: any) => {
        if (res.success) {
          this.show = true;
        }
      });
  }
}
