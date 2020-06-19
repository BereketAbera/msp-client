import { SocialReferralService } from "./../../service/social-referral.service";
import { Component, OnInit } from "@angular/core";

import * as moment from "moment";

@Component({
  selector: "app-social-referral",
  templateUrl: "./social-referral.component.html",
  styleUrls: ["./social-referral.component.scss"],
})
export class SocialReferralComponent implements OnInit {
  codes: any = [];
  buttonDisable = false;
  constructor(private referralService: SocialReferralService) {}

  ngOnInit() {
    this.referralService.getBuyerReferralList().subscribe((res) => {
      this.codes = res;
    });
  }

  generateCode() {
    this.buttonDisable = true;
    this.referralService.generateNewCode().subscribe(
      (res) => {
        this.buttonDisable = false;
        this.codes.unshift(res);
      },
      (err) => console.log(err)
    );
  }

  getExpDate(val) {
    return moment(new Date()) < moment(val).add(30, "days")
      ? moment(val).add(30, "days")
      : null;
  }
}
