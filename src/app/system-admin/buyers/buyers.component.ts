import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as moment from "moment";
import { AdminService } from "./../../service/admin.service";

@Component({
  selector: "app-buyers",
  templateUrl: "./buyers.component.html",
  styleUrls: ["./buyers.component.scss"]
})
export class BuyersComponent implements OnInit {
  dataSource = [];
  count = 0;
  pageNumber = 1;
  pageSize = 10;
  email = "";
  signUpCredit = "";
  sDate;
  eDate;
  registrationType = "";
  referralLinkKey = "";
  displayedColumns = [
    "name",
    "email",
    "phoneNumber",
    "zipcode",
    "registrationType",
    "signUpCredit",
    "createdAt"
  ];
  registrationTypes = [
    { name: "ALL", value: "" },
    { name: "EMAIL REFERRAL", value: "EMAIL REFERRAL" },
    { name: "NORMAL", value: "NORMAL" },
    { name: "SOCIAL MEDIA", value: "SOCIAL MEDIA" }
  ];
  filterForm: FormGroup;
  minDate = new Date(2020, 1, 1);
  maxDate = new Date();

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      email: [""],
      referralLinkKey: [""],
      signUpCredit: [""],
      registrationType: [""],
      sDate: [],
      eDate: []
    });
    this.route.queryParamMap.subscribe((params) => {
      this.pageNumber = parseInt(params.get("pageNumber")) || 1;
      this.pageSize = parseInt(params.get("pageSize")) || 10;
      this.registrationType = params.get("registrationType") || "";
      this.email = params.get("email") || "";
      this.signUpCredit = params.get("signUpCredit") || "";
      this.sDate = params.get("sDate") || "";
      this.eDate = params.get("eDate") || "";
      this.referralLinkKey = params.get("referralLinkKey") || null;

      this.filterForm.controls["email"].setValue(this.email);
      this.filterForm.controls["signUpCredit"].setValue(this.signUpCredit);
      this.filterForm.controls["registrationType"].setValue(this.registrationType);

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
        referralLinkKey: this.referralLinkKey,
        sDate: this.sDate,
        eDate: this.eDate
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.count = res.count;
          this.dataSource = res.rows;
        },
        (err) => console.log(err)
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
      ...pObj
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: "merge"
    });
  }

  pageChange({ pageIndex, pageSize }) {
    let sObj = {
      pageNumber: pageIndex + 1,
      pageSize: pageSize
    };
    this.setUrlValues(sObj);
  }

  filterBuyer() {
    let controls = this.filterForm.controls;
    this.setUrlValues({
      pageNumber: 1,
      email: controls["email"].value,
      signUpCredit: controls["signUpCredit"].value,
      registrationType: controls["registrationType"].value,
      referralLinkKey: controls["referralLinkKey"].value,
      sDate: moment(controls["sDate"].value).isValid()
        ? moment(controls["sDate"].value).format("YYYY-MM-DD")
        : "",
      eDate: moment(controls["eDate"].value).isValid()
        ? moment(controls["eDate"].value).format("YYYY-MM-DD")
        : ""
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.filterForm.controls["sDate"].setValue(this.sDate);
      this.filterForm.controls["eDate"].setValue(this.eDate);
    });
  }

  dateChanged(date) {
    if (date == "eDate") {
      this.maxDate = this.filterForm.controls["eDate"].value;
    } else {
      this.minDate = this.filterForm.controls["sDate"].value;
    }
  }
}
