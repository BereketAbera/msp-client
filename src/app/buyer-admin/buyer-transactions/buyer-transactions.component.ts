import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TransactionService} from "../../service/transaction.service";
import {tap} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import {BuyerTransaction} from '../../model/buyer-transaction';
import {BuyerTransactionsDataSource} from "../../service/buyer-transactions-data-source.service";
import { Balance } from '../../model/balance';
@Component({
  templateUrl: './buyer-transactions.component.html',
  styleUrls: ['./buyer-transactions.component.css']
})
export class BuyerTransactionsComponent implements OnInit, AfterViewInit{
  

  dataSource: BuyerTransactionsDataSource;
  qrCode;
  balance: number = 0;
  displayedColumns= ["type","date","amount","name"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(private route: ActivatedRoute,
              private transactionService: TransactionService,private router:Router) {

  }

  ngOnInit() {
      
      this.dataSource = new BuyerTransactionsDataSource(this.transactionService);
      this.dataSource.loadTransactions(1, '', 'asc', 0, 5);
      this.route.data
      .subscribe((data: { balance: Balance}) => {
       
      
        this.balance = data.balance.amount;
        
        
      });
  }

  ngAfterViewInit() {

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadTransactionsPage())
      )
      .subscribe();

  }
  getAmount(trns:BuyerTransaction){
    if(trns.type =="DEPOSIT" || trns.type =="REFUND")
      return trns.credit;
    else
        return trns.debit;
  }
  loadTransactionsPage() {
      this.dataSource.loadTransactions(
          1,
          '',
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize);
  }


}

