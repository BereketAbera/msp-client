import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { merge } from "rxjs/observable/merge";
import { tap } from "rxjs/operators";
import { SellerOrderDataSource } from "../../service/seller-order-datasource";
import { TransactionService } from "../../service/transaction.service";
import { AuthService } from "./../../service/auth.service";
@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit, AfterViewInit {
  dataSource: SellerOrderDataSource;
  qrCode;
  balance: number = 0;
  displayedColumns = [
    "img",
    "pickupTime",
    "product",
    "status",
    "pickupStartTime",
    "pickupEndTime",
    "date",
    "totalPrice",
    "name"
  ];
  pageSize = 5;
  pageIndex = 0;

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
    this.pageIndex = parseInt(this.route.snapshot.queryParamMap.get("pageIndex")) || 0;
    this.pageSize = parseInt(this.route.snapshot.queryParamMap.get("pageSize")) || 5;
    this.dataSource = new SellerOrderDataSource(this.transactionService, this.authService);
    this.paginator.pageIndex = this.pageIndex;
    this.paginator.pageSize = this.pageSize;

    this.dataSource.loadTransactions(1, "", "asc", this.pageIndex, this.pageSize);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((res: any) => {
          this.setUrlValues({
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize
          });
          this.loadTransactionsPage();
        })
      )
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

  getOrderStatus(order) {
    if (order.status) {
      return "Processed";
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

  setUrlValues(sObj) {
    // console.log(sObj);
    let keys = Object.keys(sObj);
    let pObj = {};
    keys.map((key) => {
      pObj[key] = sObj[key];
    });
    const queryParams: Params = {
      ...pObj
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: "merge"
    });
  }
}
