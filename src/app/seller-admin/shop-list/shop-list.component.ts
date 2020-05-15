import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
} from "@angular/material";
import { ShopsService } from "../../service/shops.service";
import { AuthService } from "../../service/auth.service";
import { tap } from "rxjs/operators";
import { merge } from "rxjs/observable/merge";
import { ShopsDataSource } from "../../service/shopsDataSource";
import { SaveConfirmationDialogComponent } from "src/app/shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "src/app/shared/save-progress/save-progress.component";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-shop-list",
  templateUrl: "./shop-list.component.html",
  styleUrls: ["./shop-list.component.scss"],
})
export class ShopListComponent implements OnInit, AfterViewInit {
  errors;
  showError: boolean = false;
  dataSource: ShopsDataSource;

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

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
    this.dataSource = new ShopsDataSource(this.shopsService);
    this.dataSource.loadShops(1, "", "asc", 0, 5);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadShopsPage()))
      .subscribe();
  }
  gotoAddNewShop() {
    try {
      let status = this.authService.getMyStatus();
      let userStatus = parseInt(status.toString());
      this.router.navigate(["./newshp"], { relativeTo: this.route });
      if (userStatus == 1)
        this.router.navigate(["./newshp"], { relativeTo: this.route });
      else {
        this.showError = true;
        this.errors = [
          "Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com.",
        ];
      }
    } catch (err) {
      this.showError = true;
      this.errors = [
        "Sorry, your account is either inactive or disabled.Please contact sales@ManagerSpecial.com.",
      ];
    }
  }
  loadShopsPage() {
    this.dataSource.loadShops(
      1,
      "",
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
  close() {
    this.showError = false;
  }

  editProduct(shop) {
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
              progressDialogRef.close();
              let snackBarRef = this.snackBar.open("Successfuly Removed", "", {
                duration: 2000,
              });
              snackBarRef.afterDismissed().subscribe(() => {
                this.dataSource.loadShops(1, "", "asc", 0, 5);
              });
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
}
