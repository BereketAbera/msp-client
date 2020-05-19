import { AuthService } from "./../../service/auth.service";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
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
  displayedColumns = ["img", "product", "status", "date", "totalPrice", "name"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

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
}
