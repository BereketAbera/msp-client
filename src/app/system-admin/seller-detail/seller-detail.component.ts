import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
@Component({
  selector: "app-seller-detail",
  templateUrl: "./seller-detail.component.html",
  styleUrls: ["./seller-detail.component.scss"],
})
export class SellerDetailComponent implements OnInit {
  seller: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      // console.log(data)
      this.seller = data.seller[0];
    });
  }
  gotoSeller() {
    this.location.back();
    // this.router.navigate(["../../"], { relativeTo: this.route });
  }
}
