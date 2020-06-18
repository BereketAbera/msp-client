import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { AdminService } from "./../../service/admin.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-buyers",
  templateUrl: "./buyers.component.html",
  styleUrls: ["./buyers.component.scss"],
})
export class BuyersComponent implements OnInit {
  dataSource = [];
  count = 0;
  pageNumber = 1;
  pageSize = 10;
  email = "";
  signUpCredit = "";
  date = "";
  registrationType = "";
  displayedColumns = [
    "name",
    "email",
    "phoneNumber",
    "registrationType",
    "signUpCredit",
    "createdAt",
  ];
  registrationTypes = [
    { name: "EMAIL REFERRAL", value: "EMAIL REFERRAL" },
    { name: "NORMAL", value: "NORMAL" },
    { name: "SOCIAL MEDIA", value: "REFERRAL CODE" },
  ];
  filterForm: FormGroup;
  @ViewChild("dateValue") dateValue;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      email: [""],
      signUpCredit: [""],
      registrationType: [""],
      date: [""],
    });
    this.route.queryParamMap.subscribe((params) => {
      this.pageNumber = parseInt(params.get("pageNumber")) || 1;
      this.pageSize = parseInt(params.get("pageSize")) || 10;
      this.registrationType = params.get("registrationType") || "";
      this.email = params.get("email") || "";
      this.signUpCredit = params.get("signUpCredit") || "";
      this.date = params.get("date") || "";

      this.filterForm.controls["email"].setValue(this.email);
      this.filterForm.controls["signUpCredit"].setValue(this.signUpCredit);
      this.filterForm.controls["registrationType"].setValue(
        this.registrationType
      );

      this.getUsers({ pageIndex: this.pageNumber, pageSize: this.pageSize });
    });
  }

  getUsers({ pageIndex, pageSize }) {
    this.adminService
      .getFilteredBuyers({
        pageSize,
        pageNumber: pageIndex,
        email: this.email,
        signUpCredit: this.signUpCredit,
        registrationType: this.registrationType,
        date: this.date,
      })
      .subscribe((res) => {
        this.count = res.count;
        this.dataSource = res.rows;
      });
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

  pageChange({ pageIndex, pageSize }) {
    let sObj = {
      pageNumber: pageIndex + 1,
      pageSize: pageSize,
    };
    this.setUrlValues(sObj);
  }

  filterBuyer() {
    let controls = this.filterForm.controls;
    this.setUrlValues({
      email: controls["email"].value,
      signUpCredit: controls["signUpCredit"].value,
      registrationType: controls["registrationType"].value,
      date: moment(controls["date"].value).isValid()
        ? moment(controls["date"].value).format("YYYY-MM-DD")
        : "",
    });
  }
}
