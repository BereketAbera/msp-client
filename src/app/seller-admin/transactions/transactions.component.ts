import { AuthService } from "./../../service/auth.service";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TransactionService } from "../../service/transaction.service";
import { tap } from "rxjs/operators";
import { merge } from "rxjs/observable/merge";
import { SellerOrderDataSource } from "../../service/seller-order-datasource";
import { Balance } from "../../model/balance";
@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit, AfterViewInit {
  dataSource: SellerOrderDataSource;
  qrCode;
  balance: number = 0;
  displayedColumns = [
    "img",
    "product",
    "status",
    "pickupStartTime",
    "pickupEndTime",
    "date",
    "totalPrice",
    "name",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild("input") input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.dataSource = new SellerOrderDataSource(
      this.transactionService,
      this.authService
    );

    this.dataSource.loadTransactions(1, "", "asc", 0, 5);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadTransactionsPage()))
      .subscribe();
  }
  gotoAddNewProduct() {
    this.router.navigate(["./nwadtlgu"], { relativeTo: this.route });
  }

  loadTransactionsPage() {
    this.dataSource.loadTransactions(
      1,
      "",
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  goToProcessOrder() {
    this.router.navigate(["./process"], { relativeTo: this.route });
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

  getOrderStatus(order) {
    if (order.status) {
      return "Picked Up";
    } else {
      let local = new Date().toISOString();
      let pDate = order.purchaseTime.split("T")[0];
      let utcDate = local.split("T")[0];
      if (pDate == utcDate) {
        // let pTime = order.pickupEndTime;
        // let utcTime = local.split("T")[1].split(".")[0];
        // console.log(pTime, utcTime);
        // if (pTime == "00:00:00") return "Active";
        // if (pTime >= utcTime) return "Active";
        // else return "Expired";
        return "Active";
      } else {
        return "Expired";
      }
    }
  }
}
