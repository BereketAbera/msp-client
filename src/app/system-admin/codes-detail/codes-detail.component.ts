import { ActivatedRoute, Router, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/service/admin.service";

@Component({
  selector: "app-codes-detail",
  templateUrl: "./codes-detail.component.html",
  styleUrls: ["./codes-detail.component.scss"],
})
export class CodesDetailComponent implements OnInit {
  registrationType = "";
  pageNumber = 1;
  pageSize = 5;
  count = 0;
  dataSource: any = null;
  displayedColumns = [
    "name",
    "email",
    "phoneNumber",
    "registrationType",
    "signUpCredit",
    "createdAt",
  ];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.registrationType = params.get("code");
    });
    this.route.queryParamMap.subscribe((params) => {
      this.pageNumber = parseInt(params.get("pageNumber")) || 1;
      this.pageSize = parseInt(params.get("pageSize")) || 5;
      this.getUsers({ pageIndex: this.pageNumber, pageSize: this.pageSize });
    });
  }

  getUsers({ pageIndex, pageSize }) {
    this.adminService
      .getFilteredBuyers({
        pageSize,
        pageNumber: pageIndex,
        registrationType: this.registrationType,
      })
      .subscribe((res) => {
        // console.log(res);
        this.count = res.count;
        this.dataSource = res.rows || [];
        // console.log(this.dataSource);
      });
  }

  pageChange({ pageIndex, pageSize }) {
    let sObj = {
      pageNumber: pageIndex + 1,
      pageSize: pageSize,
    };
    this.setUrlValues(sObj);
  }

  setUrlValues(sObj) {
    console.log(sObj);
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
}
