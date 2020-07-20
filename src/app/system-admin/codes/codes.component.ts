import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { SocialReferralService } from "./../../service/social-referral.service";
import * as moment from "moment";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-codes",
  templateUrl: "./codes.component.html",
  styleUrls: ["./codes.component.scss"],
})
export class CodesComponent implements OnInit {
  referredCredit = new FormControl();
  codes: any = null;
  buttonDisable = false;
  pageNumber = 0;
  pageSize = 5;
  code = "";
  createdDate = "";
  count;
  maxDate = new Date();
  displayedColumns = ["code", "credit", "expiresAt", "status", "action"];
  filterForm: FormGroup;

  constructor(
    private referralService: SocialReferralService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      code: [""],
      createdDate: [""],
    });
    this.route.queryParamMap.subscribe((params) => {
      this.pageNumber = parseInt(params.get("pageNumber")) || 1;
      this.pageSize = parseInt(params.get("pageSize")) || 0;
      this.code = params.get("code") || "";
      this.createdDate = params.get("createdDate") || "";
      this.getCodes();
    });
  }

  getCodes() {
    this.referralService
      .getAdminCodeList({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        code: this.code,
        createdDate: this.createdDate,
      })
      .subscribe((res) => {
        // console.log(res);
        this.count = res.count;
        this.codes = res.rows;
      });
  }

  generateNewCode() {
    if (!isNaN(this.referredCredit.value)) {
      this.buttonDisable = true;
      this.referralService
        .generateNewAdminCode(this.referredCredit.value)
        .subscribe((code) => {
          this.buttonDisable = false;
          this.referredCredit.reset();
          this.getCodes();
        });
    }
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

  pageChange({ pageIndex, pageSize }) {
    let sObj = {
      pageNumber: pageIndex + 1,
      pageSize: pageSize,
    };
    this.setUrlValues(sObj);
  }

  getExpDate(createdDate) {
    return moment(createdDate).add(30, "days");
  }

  checkExp(createdDate) {
    return moment(createdDate).add(30, "days") < moment(new Date())
      ? "Expired"
      : "Active";
  }

  filterCode() {
    this.setUrlValues({
      code: this.filterForm.controls["code"].value,
      createdDate: moment(
        this.filterForm.controls["createdDate"].value
      ).isValid()
        ? moment(this.filterForm.controls["createdDate"].value).format(
            "YYYY-MM-DD"
          )
        : "",
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.filterForm.controls["createdDate"].setValue(this.createdDate);
    });
  }
}
