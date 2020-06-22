import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "../../service/user.service";
import { tap } from "rxjs/operators";
import { merge } from "rxjs/observable/merge";
import { DailySalesDataSource } from "../../service/daily-sales-data-source.service";
import { DailySale } from "../../model/daily-sale";
import { Moment } from "moment";
import * as moment from "moment";
import { Location } from "@angular/common";

@Component({
  selector: "app-sales-summary",
  templateUrl: "./sales-summary.component.html",
  styleUrls: ["./sales-summary.component.scss"],
})
export class SalesSummaryComponent implements OnInit, AfterViewInit {
  dataSource: DailySalesDataSource;
  qrCode;
  balance: number = 0;
  displayedColumns = [
    "product",
    "normalPrice",
    "offeredQty",
    "soldQty",
    "picked",
    "discount",
    "revenue"
  ];
  dateStart = new FormControl(new Date());
  dateEnd = new FormControl(new Date());

  select = new FormControl('');
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild("input", { static: false }) input: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource = new DailySalesDataSource(this.userService);
    // this.dataSource.loadTransactions(this.date.value);
    this.dataSource.loadTransactions(this.dateStart.value,this.dateEnd.value,0,10);

     console.log(this.dataSource);
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadTransactionsPage()))
      .subscribe();
  }
  search() {}
  loadTransactionsPage() {
    // console.log(this.dateStart.value, this.dateEnd.value)
    this.dataSource.loadTransactions(this.dateStart.value,this.dateEnd.value,this.paginator.pageIndex, this.paginator.pageSize);
  //  console.log(this.dataSource.count);
  }
  // onDatesUpdated(e) {
  //   // console.log(e);
  //   if (e.startDate && e.endDate) {
  //     this.dataSource.loadTransactions(e.startDate, e.endDate);

  //   }
  // }
}
