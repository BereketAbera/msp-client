import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { UserService } from "../../service/user.service";
import { tap } from "rxjs/operators";
import { merge } from "rxjs/observable/merge";
import { DailySalesDataSource } from "../../service/daily-sales-data-source.service";
import { DailySale } from "../../model/daily-sale";
import { Moment } from 'moment';
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: "app-sales-summary",
  templateUrl: "./sales-summary.component.html",
  styleUrls: ["./sales-summary.component.scss"]
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
    "discount"
  ];
  selected: { startDate: Moment, endDate: Moment };
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment()],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  filtered: boolean;
  maxDate = moment().subtract(1, 'days');
  minDate = moment('2018-01-01');
  date = new FormControl(new Date());
  select = new FormControl('');
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild("input") input: ElementRef;
  defaultStart = moment().subtract(7, 'days').toDate();
  defaultEnd = moment();
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSource = new DailySalesDataSource(this.userService);
    // this.dataSource.loadTransactions(this.date.value);
    this.dataSource.loadTransactions(this.defaultStart, this.defaultEnd);

    // console.log(this.dataSource);
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadTransactionsPage()))
      .subscribe();
  }
  search() { }
  loadTransactionsPage() {
    console.log(this.defaultEnd, this.defaultStart)
    this.dataSource.loadTransactions(this.defaultStart, this.defaultEnd);
  }
  onDatesUpdated(e) {
    console.log(e);
    if (e.startDate && e.endDate) {
      this.dataSource.loadTransactions(e.startDate, e.endDate);

    }
  }
}
