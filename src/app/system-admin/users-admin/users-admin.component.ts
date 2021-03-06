import { Location } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { merge } from "rxjs/observable/merge";
import { tap } from "rxjs/operators";
import { State } from "src/app/model/state";
import { MerchantsDataSource } from "../../service/merchants.data.source";
import { UserService } from "../../service/user.service";
import { SaveConfirmationDialogComponent } from "../../shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "../../shared/save-progress/save-progress.component";

@Component({
  selector: "app-users-admin",
  templateUrl: "./users-admin.component.html",
  styleUrls: ["./users-admin.component.scss"],
})
export class UsersAdminComponent implements OnInit, AfterViewInit {
  errors;
  showError: boolean = false;
  errorMessage = "";
  detail = false;
  dataSource: MerchantsDataSource;

  displayedColumns = [
    "email",
    "companyName",
    "address",
    "state",
    "firstName",
    "lastName",
    "updatedAt",
    "status",
    "remove",
  ];
  filterForm: FormGroup;
  @ViewChild(MatPaginator, { read: MatPaginator, static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild("input") input: ElementRef;
  states: any[];
  page: number;

  statuses = [
    { value: "", name: "All" },
    { value: 1, name: "ACTIVE" },
    { value: 0, name: "PENDING" },
    { value: 2, name: "PRODUCT DISABLED" },
    { value: 3, name: "ACCOUNT DISABLED" },
  ];
  seller: any;
  sorted: "";
  orders: "";
  shops: any;
  shopCount: Number = 0;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.dataSource = new MerchantsDataSource(this.userService);
    //this.dataSource.loadMerchants(1, "", "asc", 0, 10);

    this.route.data.subscribe((data: { states: State[] }) => {
      this.states = data.states;
      // console.log(this.states)
      this.states.unshift({ id: "", name: "", abbreviation: "All" });
    });

    this.route.queryParams.subscribe(
      (data) => {
        // console.log(data);
        // console.log(this.paginator);
        if (this.paginator) {
          this.paginator.pageIndex = +data.page - 1 >= 0 ? +data.page : 0;
          this.dataSource.filterSeller(
            "",
            "",
            "",
            "",
            "",
            this.paginator.pageIndex,
            10,
            "desc",
            "",
            ""
          );
        } else {
          this.dataSource.filterSeller(
            "",
            "",
            "",
            "",
            "",
            0,
            10,
            "desc",
            "",
            ""
          );
          let path = this.location.path();
          path = path.concat(`?page=${this.paginator.pageIndex}`);
          this.location.go(path);
        }
      },
      (err) => console.log(err)
    );
    // console.log(this.dataSource);
    this.filterForm = this.formBuilder.group({
      companyName: [""],
      city: [""],
      state: [""],
      status: [""],
      shop: [""],
      referralLinkKey: [""],
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadMerchantsPage()))
      .subscribe();
  }

  loadMerchantsPage() {
    var val = this.filterForm.value;
    // console.log(this.sort);
    this.dataSource.filterSeller(
      val.companyName || "",
      val.city || "",
      val.state || "",
      val.status,
      val.shop,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.direction,
      this.sort.active,
      val.referralLinkKey || ""
    );
    let path = this.location.path();
    if (path.indexOf("page") >= 0 && this.paginator.pageIndex <= 10) {
      path = path.replace(/.$/, this.paginator.pageIndex.toString());

      this.location.go(path);
    } else if (path.indexOf("page") >= 0 && this.paginator.pageIndex >= 10) {
      path = path.replace(
        /page=[0-9][0-9]/,
        `page=${this.paginator.pageIndex.toString()}`
      );

      this.location.go(path);
    } else {
      // path = path.concat(`?sort=${this.sort.active}&order=${this.sort.direction}`)
      path = path.concat(`?page=${this.paginator.pageIndex}`);

      this.location.go(path);
    }
  }

  getStatus(status: number) {
    if (status == 0) return "ACCOUNT PENDING";
    else if (status == 1) return "ACTIVE";
    else if (status == 2) return "NEW PRODUCTS DISABLED";
    else if (status == 3) return "ACCOUNT DISABLED";
    else return "ACTIVE";
  }
  showActivateAccount(status: number) {
    if (status == 0 || status == 2 || status == 3) return true;
    return false;
  }
  showDisablePrtlAccount(status: number) {
    if (status == 1 || status == 3) return true;
    return false;
  }
  showDisableAccount(status: number) {
    if (status == 1 || status == 2) return true;
    return false;
  }
  chageAccountStatus(user: any, status: number) {
    let cnfMsg = "";
    if (status == 1) cnfMsg = "Are you sure you want activate this account?";
    else if (status == 2)
      cnfMsg = "Are you sure you want to partially disable this account?";
    else if (status == 3)
      cnfMsg = "Are you sure you want to fully disable this account?";
    const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
      width: "250px",
      height: "16rem",
      data: { title: "", question: cnfMsg },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        const progressDialogRef = this.dialog.open(SaveProgressComponent, {
          width: "260px",
          height: "180px",
          data: { title: "", question: "" },
        });
        this.userService
          .changeUserStatus(user.sellerProfileId, status)
          .subscribe(
            (res) => {
              if (res["success"]) {
                progressDialogRef.close();
                let snackBarRef = this.snackBar.open(
                  "You have successfuly changed the account status.",
                  "",
                  {
                    duration: 5000,
                  }
                );
                snackBarRef.afterDismissed().subscribe(() => {
                  var val = this.filterForm.value;
                  // console.log(val)
                  this.dataSource.filterSeller(
                    val.companyName || "",
                    val.city || "",
                    val.state || "",
                    val.status,
                    val.shop,
                    this.paginator.pageIndex,
                    this.paginator.pageSize,
                    "desc",
                    this.sort.active,
                    val.referralLinkKey || ""
                  );
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
  close() {
    this.showError = false;
  }

  filterSeller() {
    var val = this.filterForm.value;
    this.dataSource.filterSeller(
      val.companyName || "",
      val.city || "",
      val.state || "",
      val.status,
      val.shop,
      0,
      10,
      "desc",
      "",
      val.referralLinkKey || ""
    );
  }
  onSubmit() {}

  getDetail(id) {
    this.userService.getOneSellerInfo(id).subscribe((data) => {
      this.seller = data.seller[0];
      this.shops = data.shops.rows;
      // console.log(this.shops)
      this.shopCount = data.shops.count;
      this.detail = true;
    });
  }

  cancelAction() {
    this.detail = false;
  }
}
