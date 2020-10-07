import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { ReferralLinkServiceService } from "@app/service/referral-link-service.service";
import * as moment from "moment";
import { MatSort } from "@angular/material/sort";
import { ViewChild } from "@angular/core";

@Component({
  selector: "app-links",
  templateUrl: "./links.component.html",
  styleUrls: ["./links.component.scss"],
})
export class LinksComponent implements OnInit {
  reason = new FormControl();
  type = new FormControl();
  codes: any = null;
  buttonDisable = false;
  pageNumber = 0;
  links = [];
  pageSize = 5;
  code = "";
  createdDate = "";
  count;
  maxDate = new Date();
  displayedColumns = [
    "referralLink",
    "reason",
    "key",
    "type",
    "count",
    "createdAt",
  ];
  filterForm: FormGroup;
  types = [
    { value: "BUYER", viewValue: "Buyer" },
    { value: "SELLER", viewValue: "Seller" },
    { value: "BUYER_HOME", viewValue: "Buyer Home" },
    { value: "SELLER_HOME", viewValue: "Seller Home" },
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  active;
  direction;

  constructor(
    private referralLinkService: ReferralLinkServiceService,
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
      this.active = params.get("active") || "";
      this.direction = params.get("direction") || "";
      this.getLinks();
    });
  }

  sortData(event) {
    this.setUrlValues(event);
  }

  getLinks() {
    this.referralLinkService
      .getReferralLinkList({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        code: this.code,
        createdDate: this.createdDate,
        active: this.active,
        direction: this.direction,
      })
      .subscribe((res) => {
        // console.log(res);
        this.count = res.count;
        this.links = res.referralLinks;
      });
  }

  generateNewLink() {
    // console.log(this.reason.value);
    if (this.reason.value && this.type.value) {
      this.buttonDisable = true;
      this.referralLinkService
        .createNewReferalLink({
          reason: this.reason.value,
          type: this.type.value,
        })
        .subscribe((referralLink) => {
          this.buttonDisable = false;
          this.reason.reset();
          this.type.reset();
          this.getLinks();
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

  // pageChange({ pageIndex, pageSize }) {
  //   let sObj = {
  //     pageNumber: pageIndex + 1,
  //     pageSize: pageSize,
  //   };
  //   this.setUrlValues(sObj);
  // }

  // filterCode() {
  //   this.setUrlValues({
  //     code: this.filterForm.controls["code"].value,
  //     createdDate: moment(
  //       this.filterForm.controls["createdDate"].value
  //     ).isValid()
  //       ? moment(this.filterForm.controls["createdDate"].value).format(
  //           "YYYY-MM-DD"
  //         )
  //       : "",
  //   });
  // }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.filterForm.controls["createdDate"].setValue(this.createdDate);
  //   });
  // }
}
