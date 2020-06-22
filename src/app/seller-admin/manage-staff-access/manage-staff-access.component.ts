import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { SellerStaffService } from "src/app/service/seller-staff.service";

@Component({
  selector: "app-manage-staff-access",
  templateUrl: "./manage-staff-access.component.html",
  styleUrls: ["./manage-staff-access.component.scss"],
})
export class ManageStaffAccessComponent implements OnInit {
  features = [];
  user_features = [];
  orginal_user_features = [];
  userId;
  products = [];
  other_features = [];

  constructor(
    private route: ActivatedRoute,
    private sellerStaffService: SellerStaffService,
    private location: Location,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (response) => {
        this.features = response.features;
        this.orginal_user_features = response.user_features.data;
        this.extractCategories(response.features);
        this.extractFeatureRoute(response.user_features.data);
        this.userId = response.user_features.userId;
      },
      (err) => console.log(err)
    );
  }

  extractFeatureRoute(features) {
    features.map((f) => this.user_features.push(f.description));
  }

  extractCategories(features) {
    features.map((f) => {
      if (f.description.includes("Product")) {
        this.products.push(f);
      } else {
        this.other_features.push(f);
      }
    });
  }

  updateUser(description, featureId) {
    if (this.checkIncludes(description)) {
      this.sellerStaffService
        .removeStaffRouteAccess({ description, userId: this.userId })
        .subscribe(
          (data) => {},
          (err) => console.log(err)
        );
      // this.sellerStaffService.addStaffRouteAccess(this.userId, featureId);
    } else {
      this.sellerStaffService
        .addStaffRouteAccess(this.userId, featureId)
        .subscribe(
          (data) => {},
          (err) => console.log(err)
        );
    }
  }

  checkIncludes(description) {
    return this.user_features.indexOf(description) >= 0;
  }

  goBack() {
    let snackBarRef = this.snackBar.open(
      "If the change is not active, ask the affected employee to refresh his/her screen.",
      "",
      {
        duration: 5000,
      }
    );
    this.location.back();
  }
}
