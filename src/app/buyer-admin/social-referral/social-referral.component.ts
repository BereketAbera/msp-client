import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { ConfiguartionService } from "src/app/service/configuartion.service";
import { SocialReferralService } from "./../../service/social-referral.service";

@Component({
  selector: "app-social-referral",
  templateUrl: "./social-referral.component.html",
  styleUrls: ["./social-referral.component.scss"],
})
export class SocialReferralComponent implements OnInit {
  codes: any = [];
  buttonDisable = false;
  config: any;
  constructor(
    private referralService: SocialReferralService,
    private configService: ConfiguartionService
  ) {}

  ngOnInit() {
    this.referralService.getBuyerReferralList().subscribe((res) => {
      this.codes = res;
    });
    this.config = this.configService.configData;
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
