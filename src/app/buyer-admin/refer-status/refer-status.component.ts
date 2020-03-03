import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UserService} from "../../service/user.service";
import {RefersDataSource} from '../../service/refers-data-source.service';
import {tap} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";


@Component({
  selector: 'app-refer-status',
  templateUrl: './refer-status.component.html',
  styleUrls: ['./refer-status.component.scss']
})
export class ReferStatusComponent implements OnInit, AfterViewInit{
  

  dataSource: RefersDataSource;
  qrCode;
  balance: number = 0;
  displayedColumns= ["email","type","isUsed","createdAt"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(private route: ActivatedRoute,
              private userService: UserService,private router:Router) {

  }

  ngOnInit() {
      
      this.dataSource = new RefersDataSource(this.userService);
      this.dataSource.loadRefers('', 'asc', 0, 5);
      
  }
  getType(type:number){
    if(type==2)
      return "Seller";
      return "Buyer";

  }
  isRegistered(isRegistered:boolean){
    if(isRegistered)
      return "Yes";
      return "No";

  }
  ngAfterViewInit() {

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadTransactionsPage())
      )
      .subscribe();

  }
  
  loadTransactionsPage() {
      this.dataSource.loadRefers(
         '',
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize);
  }


}


