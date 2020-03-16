import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import {ActivatedRoute,Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ProductService} from "../../service/product.service";
import {tap} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import {ProductsDataSource} from "../../service/products-data-source.service";
import { Product } from '../../model/product';

import {AuthService} from '../../service/auth.service';

import { SaveConfirmationDialogComponent } from '../../shared/save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveProgressComponent } from '../../shared/save-progress/save-progress.component';


@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit{
  
    errors;
    showError:boolean = false;

  dataSource: ProductsDataSource;

  displayedColumns= ["img","name", "shop", "discountPrice","dispercentage","remove"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(public snackBar: MatSnackBar,public dialog: MatDialog,private route: ActivatedRoute,
              private productService: ProductService,private router:Router,private authService:AuthService) {

  }

  ngOnInit() {
      this.dataSource = new ProductsDataSource(this.productService);
      this.dataSource.loadProducts(1, '', 'asc', 0, 5);
  }

  ngAfterViewInit() {

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadProductsPage())
      )
      .subscribe();

  }
  gotoAddNewProduct(){
    try{
      let status = this.authService.getMyStatus();
      let userStatus = parseInt(status.toString());
      if(userStatus == 1)
        this.router.navigate(["./nwclsngtlgu"],{relativeTo:this.route});
        else{
          this.showError = true;
          this.errors = ["Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com."]
        }
    }catch(err){
      this.showError = true;
      this.errors = ["Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com."]
    }
  }
  gotoOffPeakProduct(){
    try{
      let status = this.authService.getMyStatus();
      let userStatus = parseInt(status.toString());
      if(userStatus == 1)
        this.router.navigate(["./nwoffpktlgu"],{relativeTo:this.route});
        else{
          this.showError = true;
          this.errors = ["Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com."]
        }
    }catch(err){
      this.showError = true;
      this.errors = ["Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com."]
    }
  }

  editProduct($event){
    this.router.navigate([`./nwoffpktlgu/edit/${$event.id}`],{relativeTo:this.route})
  }
  cloneProduct($event){
    this.router.navigate([`./nwoffpktlgu/clone/${$event.id}`],{relativeTo:this.route})
  }
  loadProductsPage() {
      this.dataSource.loadProducts(
          1,
          '',
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize);
  }
  removeProduct(product:Product){
          const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
            width: '250px',
            height: '300px',
            data: { title: "", question: "\<strong\>Please note:\<\/strong\> Some buyers might be placing orders on the product being deleted. You might still get orders after deletion.\n Do you want to remove the product?" }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result == "yes") {
              const progressDialogRef = this.dialog.open(SaveProgressComponent, {
                width: '260px',
                height:'180px',
                data: { title: "", question: "" }
              });
              this.productService.removeProduct(product.id).subscribe(
                res => {
                  if (res['success']) {
                    progressDialogRef.close();
                    let snackBarRef = this.snackBar.open("Successfuly Removed", "", {
                      duration: 2000,
                    });
                    snackBarRef.afterDismissed().subscribe(() => {
                        this.dataSource.loadProducts(1, '', 'asc', 0, 5);
                    });
                     //this.router.navigate(["../"], { relativeTo: this.route });
                  } else {
                    progressDialogRef.close();
                    this.showError = true;
                    this.errors = res['messages'];
                  }
                },
                err => {
                  progressDialogRef.close();
                }
              );
            }
          });
  
       
     
  }
  close() {
    this.showError = false;
  }


}

