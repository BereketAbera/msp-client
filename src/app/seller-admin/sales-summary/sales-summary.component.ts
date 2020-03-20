import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UserService} from "../../service/user.service";
import {tap} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import {DailySalesDataSource} from "../../service/daily-sales-data-source.service";
import { DailySale } from '../../model/daily-sale';

import * as moment from 'moment';

@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./sales-summary.component.scss']
})
export class SalesSummaryComponent implements OnInit,AfterViewInit {
  dataSource: DailySalesDataSource;
  qrCode;
  balance: number = 0;
  displayedColumns= ["product","normalPrice","offeredQty","soldQty","picked","discount"];
  date = new FormControl(new Date());

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;
  constructor(private route: ActivatedRoute,
    private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.dataSource = new DailySalesDataSource(this.userService);
    this.dataSource.loadTransactions(this.date.value);

    console.log(this.dataSource)
  }
  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadTransactionsPage())
    )
    .subscribe();

}
search(){

}
loadTransactionsPage() {
  this.dataSource.loadTransactions(this.date.value);
}

}
