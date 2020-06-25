import { Component, OnInit } from "@angular/core";
import { SocialReferralService } from "src/app/service/social-referral.service";

@Component({
  selector: "app-social-referrals",
  templateUrl: "./social-referrals.component.html",
  styleUrls: ["./social-referrals.component.scss"],
})
export class SocialReferralsComponent implements OnInit {
  dataSource: any = {};
  displayedColumns = ["bonusCode", "newRegistrations", "registrationDate"];
  pageSize = 5;
  pageNumber = 0;
  constructor(private referralService: SocialReferralService) {}

  ngOnInit(): void {
    this.referralService
      .getUserSocialReferrals(this.pageSize || 5, this.pageNumber || 0)
      .subscribe((res) => {
        this.dataSource = res;
      });
  }

  getReferrals({ pageSize, pageIndex }) {
    this.pageSize = pageSize;
    this.pageNumber = pageIndex;
    this.referralService
      .getUserSocialReferrals(this.pageSize, this.pageNumber)
      .subscribe((res) => {
        this.dataSource = res;
        window.scroll(0, 0);
      });
  }
}
