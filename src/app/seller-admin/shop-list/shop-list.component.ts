import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { merge } from "rxjs/observable/merge";
import { tap } from "rxjs/operators";
import { SaveConfirmationDialogComponent } from "src/app/shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "src/app/shared/save-progress/save-progress.component";
import { AuthService } from "../../service/auth.service";
import { ShopsService } from "../../service/shops.service";
import { ShopsDataSource } from "../../service/shopsDataSource";

@Component({
  selector: "app-shop-list",
  templateUrl: "./shop-list.component.html",
  styleUrls: ["./shop-list.component.scss"],
})
export class ShopListComponent implements OnInit, AfterViewInit {
  errors;
  showError: boolean = false;
  dataSource: ShopsDataSource;
  sortBy = "";
  direction = "asc";
  page = 0;
  pageSize = 5;

  displayedColumns = [
    "name",
    "address",
    "ZipCode",
    "contact",
    "phone",
    "city",
    "state",
    "menu",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild("input") input: ElementRef;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private shopsService: ShopsService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new ShopsDataSource(this.shopsService, this.authService);
    this.dataSource.loadShops(1, "", "", "asc", 0, 5);
    this.route.queryParams.subscribe((data) => {
      this.sortBy = data.sortBy;
      this.direction = data.direction;
      this.page = data.page;
      this.pageSize = data.pageSize;
      this.paginator.pageIndex = +data.page - 1 >= 0 ? +data.page : 0;
      this.paginator.pageSize = data.pageSize || 5;
      this.sort.active = data.sortBy || "";
      this.sort.direction = data.direction || "asc";

      this.dataSource.loadShops(
        1,
        "",
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((res: any) => {
          this.setUrlValues({
            sortBy: res.active || this.sortBy,
            direction: res.direction || this.direction,
            page: res.pageIndex || (res.pageIndex == 0 ? 0 : this.page),
            pageSize: res.pageSize || this.pageSize,
          });
        })
      )
      .subscribe();
  }
  gotoAddNewShop() {
    try {
      let status = this.authService.getMyStatus();
      let userStatus = parseInt(status.toString());
      this.router.navigate(["./newshp"], { relativeTo: this.route });
      // if (userStatus == 1)
      //   this.router.navigate(["./newshp"], { relativeTo: this.route });
      // else {
      //   this.showError = true;
      //   this.errors = [
      //     "Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com.",
      //   ];
      // }
    } catch (err) {
      // this.showError = true;
      // this.errors = [
      //   "Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com.",
      // ];
    }
  }
  loadShopsPage() {
    this.dataSource.loadShops(
      1,
      "",
      "",
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  setUrlValues(sObj) {
    // console.log(sObj);
    let keys = Object.keys(sObj);
    let pObj = {};
    keys.map((key) => {
      pObj[key] = sObj[key];
    });
    const queryParams: Params = {
      ...pObj,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: "merge",
    });
  }
  close() {
    this.showError = false;
  }

  editShop(shop) {
    this.router.navigate([`/tlgu-slr/shops/edit/${shop.id}`]);
  }
  removeShop(shop) {
    const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
      width: "350px",
      height: "250px",
      data: {
        title: "",
        question:
          "<strong>Please note:</strong> Some buyers might be placing orders on the product in this shop being deleted. You might still get orders after deletion.\n Do you want to remove the shop?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        const progressDialogRef = this.dialog.open(SaveProgressComponent, {
          width: "260px",
          height: "180px",
          data: { title: "", question: "" },
        });
        this.shopsService.removeShop(shop.id).subscribe(
          (res) => {
            if (res["success"]) {
              this.dataSource.loadShops(1, "", "", "asc", 0, 5);
              progressDialogRef.close();
              let snackBarRef = this.snackBar.open("Successfuly Removed", "", {
                duration: 5000,
              });
              snackBarRef.afterDismissed().subscribe(() => {});
              //this.router.navigate(["../"], { relativeTo: this.route });
            } else {
              progressDialogRef.close();
              this.showError = true;
              this.errors = res["messages"];
            }
          },
          (err) => {
            progressDialogRef.close();
          }
        );
      }
    });
  }

  phoneChangeFormat(value, type) {
    if (type == "db") {
      return "+1" + value.replace(/[()-\s]/g, "");
    } else {
      let v = value.replace("+1", "").replace(/[()-\s]/g, "");
      return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
    }
  }
}
