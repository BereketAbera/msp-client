import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { SocialReferralService } from "./../../service/social-referral.service";
import * as moment from "moment";

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
  count;

  displayedColumns = ["code", "credit", "expiresAt", "status", "action"];

  constructor(
    private referralService: SocialReferralService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.pageNumber = parseInt(params.get("pageNumber")) || 1;
      this.pageSize = parseInt(params.get("pageSize")) || 0;
      this.getCodes();
    });
  }

  getCodes() {
    this.referralService
      .getAdminCodeList(this.pageNumber, this.pageSize)
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
}
