import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { merge } from "rxjs/observable/merge";
import { tap } from "rxjs/operators";
import { Balance } from "../../model/balance";
import { BuyerTransaction } from "../../model/buyer-transaction";
import { BuyerTransactionsDataSource } from "../../service/buyer-transactions-data-source.service";
import { TransactionService } from "../../service/transaction.service";
import { AuthService } from "./../../service/auth.service";
@Component({
  templateUrl: "./buyer-transactions.component.html",
  styleUrls: ["./buyer-transactions.component.scss"],
})
export class BuyerTransactionsComponent implements OnInit, AfterViewInit {
  dataSource: BuyerTransactionsDataSource;
  qrCode;
  balance: number = 0;
  displayedColumns = ["type", "date", "amount", "reason", "name"];

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
    this.dataSource = new BuyerTransactionsDataSource(
      this.transactionService,
      this.authService
    );
    this.dataSource.loadTransactions(1, "", "asc", 0, 5);
    this.route.data.subscribe((data: { balance: Balance }) => {
      this.balance = data.balance.amount;
    });
    // console.log(this.dataSource);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadTransactionsPage()))
      .subscribe();
  }
  getAmount(trns: BuyerTransaction) {
    if (trns.type == "DEPOSIT" || trns.type == "REFUND") return trns.credit;
    else return trns.debit;
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
}
