import { Location } from "@angular/common";
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
import { Product } from "../../model/product";
import { AuthService } from "../../service/auth.service";
import { ProductService } from "../../service/product.service";
import { ProductsDataSource } from "../../service/products-data-source.service";
import { SaveConfirmationDialogComponent } from "../../shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "../../shared/save-progress/save-progress.component";
import { ThrowStmt } from "@angular/compiler";

@Component({
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  errors;
  showError: boolean = false;
  sortBy = "";
  direction = "asc";
  page = 0;
  pageSize = 5;

  dataSource: ProductsDataSource;

  displayedColumns = [
    "img",
    "name",
    "shop",
    "regularPrice",
    "dispercentage",
    "createdDate",
    "remove",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild("input") input: ElementRef;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    this.dataSource = new ProductsDataSource(
      this.productService,
      this.authService
    );

    this.route.queryParams.subscribe(
      (data) => {
        this.page = data.page;
        this.pageSize = data.pageSize;
        this.sortBy = data.sortBy;
        this.direction = data.direction;
        this.paginator.pageIndex = +data.page - 1 >= 0 ? +data.page : 0;
        this.paginator.pageSize = data.pageSize || 5;
        this.sort.active = data.sortBy || "";
        this.sort.direction = data.direction || "asc";
        this.dataSource.loadProducts(
          1,
          "",
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize
        );
      },
      (err) => console.log(err)
    );
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.sort.sortChange.subscribe((res) => {
        this.paginator.pageIndex = 0;
      });
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          tap((res: any) => {
            this.setUrlValues({
              sortBy: res.active || this.sortBy,
              direction: res.direction || this.direction,
              page: res.pageIndex || (res.pageIndex == 0 ? 0 : this.page),
              pageSize: res.pageSize || this.pageSize,
            });
            // this.loadProductsPage();
          })
        )
        .subscribe();
    }
  }
  gotoAddNewProduct() {
    try {
      let status = this.authService.getMyStatus();
      let userStatus = parseInt(status.toString());
      if (userStatus == 1)
        this.router.navigate(["./nwclsngtlgu"], { relativeTo: this.route });
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
  gotoOffPeakProduct() {
    try {
      let status = this.authService.getMyStatus();
      let userStatus = parseInt(status.toString());
      if (userStatus == 1)
        this.router.navigate(["./nwoffpktlgu"], { relativeTo: this.route });
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

  editProduct($event) {
    this.router.navigate([`./nwoffpktlgu/edit/${$event.id}`], {
      relativeTo: this.route,
    });
  }
  cloneProduct($event) {
    this.router.navigate([`./nwoffpktlgu/clone/${$event.id}`], {
      relativeTo: this.route,
    });
  }
  loadProductsPage() {
    if (this.sort.active) {
      this.dataSource.loadProducts(
        1,
        "",
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    } else {
      this.dataSource.loadProducts(
        1,
        "",
        "",
        "",
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    }
    this.setUrlValues({ page: this.paginator.pageIndex });
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

  removeProduct(product: Product) {
    const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
      width: "400px",
      height: "auto",
      data: {
        title: "",
        question:
          "<strong>Please note:</strong> Some buyers might be placing orders on the product being deleted. You might still get orders after deletion.\n Do you want to remove the product?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        const progressDialogRef = this.dialog.open(SaveProgressComponent, {
          width: "260px",
          height: "180px",
          data: { title: "", question: "" },
        });
        this.productService.removeProduct(product.id).subscribe(
          (res) => {
            if (res["success"]) {
              progressDialogRef.close();
              this.dataSource.loadProducts(
                1,
                "",
                this.sort.active,
                this.sort.direction,
                this.paginator.pageIndex,
                5
              );
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
  close() {
    this.showError = false;
  }
}
