import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ShopsService} from "../../service/shops.service";
import {AuthService} from '../../service/auth.service';
import {tap} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import {ShopsDataSource} from "../../service/shopsDataSource";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit, AfterViewInit{
  
    errors;
    showError:boolean = false;
  dataSource: ShopsDataSource;

  displayedColumns= ["name", "address", "ZipCode","contact","phone"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(private authService:AuthService, private route: ActivatedRoute,
              private shopsService: ShopsService,private router:Router) {

  }

  ngOnInit() {
      this.dataSource = new ShopsDataSource(this.shopsService);
      this.dataSource.loadShops(1, '', 'asc', 0, 5);
  }

  ngAfterViewInit() {

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadShopsPage())
      )
      .subscribe();

  }
  gotoAddNewShop(){
    
    try{
        let status = this.authService.getMyStatus();
        let userStatus = parseInt(status.toString());
        if(userStatus == 1)
        this.router.navigate(["./newshp"],{relativeTo:this.route})
          else{
            this.showError = true;
            this.errors = ["Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com."]
          }
      }catch(err){
        this.showError = true;
        this.errors = ["Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com."]
      }
  }
  loadShopsPage() {
      this.dataSource.loadShops(
          1,
          '',
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize);
  }
  close() {
    this.showError = false;
  }

}

