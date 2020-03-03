import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { UserService } from "../../service/user.service";
import { tap } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { MerchantsDataSource } from "../../service/merchants.data.source";
import { Product } from 'src/app/model/product';

import { SaveConfirmationDialogComponent } from '../../shared/save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveProgressComponent } from '../../shared/save-progress/save-progress.component';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit, AfterViewInit {

  errors;
  showError: boolean = false;

  dataSource: MerchantsDataSource;

  displayedColumns = ["email", "firstName", "lastName","updatedAt","status", "remove"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, private route: ActivatedRoute,
    private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.dataSource = new MerchantsDataSource(this.userService);
    this.dataSource.loadMerchants(1, '', 'asc', 0, 5);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadMerchantsPage())
      )
      .subscribe();

  }
  loadMerchantsPage() {
    this.dataSource.loadMerchants(
      1,
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  getStatus(status: number) {
    if (status == 0)
      return "ACCOUNT PENDING";
    else if (status == 1)
      return "ACTIVE";
    else if (status == 2)
      return "NEW PRODUCTS DISABLED";
    else if (status == 3)
      return "ACCOUNT DISABLED";
    else
      return "ACTIVE"

  }
  showActivateAccount(status: number) {
    if (status == 0 || status == 2 || status == 3)
      return true;
    return false;
  }
  showDisablePrtlAccount(status: number) {
    if (status == 1 || status == 3)
      return true;
    return false;
  }
  showDisableAccount(status: number) {
    if (status == 1 || status == 2)
      return true;
    return false;
  }
  chageAccountStatus(user:User,status:number) {
    let cnfMsg = "";
    if(status == 1)
       cnfMsg = "Are you sure you want activate this account?"
    else if(status == 2)   
      cnfMsg = "Are you sure you want to partially disable this account?"
    else if(status == 3)   
      cnfMsg = "Are you sure you want to fully disable this account?"
    const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
      width: '250px',
      height: '300px',
      data: { title: "", question: cnfMsg }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        const progressDialogRef = this.dialog.open(SaveProgressComponent, {
          width: '260px',
          height:'180px',
          data: { title: "", question: "" }
        });
        this.userService.changeUserStatus(user.id,status).subscribe(
          res => {
            if (res['success']) {
              progressDialogRef.close();
              let snackBarRef = this.snackBar.open("You have successfuly changed the account status.", "", {
                duration: 2000,
              });
              snackBarRef.afterDismissed().subscribe(() => {
                  this.dataSource.loadMerchants(1, '', 'asc', 0, 5);
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

