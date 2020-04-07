import { FeaturedDataSource } from "./../../service/featured-data-source";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SellerStaffService } from "src/app/service/seller-staff.service";
import { ifStmt } from "@angular/compiler/src/output/output_ast";

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
    private location: Location
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
    this.location.back();
  }
}
