import { AuthService } from "./../../service/auth.service";
import { SellerStaffService } from "./../../service/seller-staff.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  background = "primary";
  links = [];
  name: string = "";
  role: string = "";
  @ViewChild("drawerCheckbox") drawerCheckbox: ElementRef;
  currentUser: any = {};
  features: any = [];
  // role = 'SELLER';

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private sellerStaffService: SellerStaffService
  ) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    this.currentUser = this.authService.getUser();
    this.sellerStaffService
      .getUserFeatures(this.currentUser.id)
      .subscribe((response) => {
        if (response.success) {
          this.features = response.features;
        }
        console.log(response);
      });
    this.name = this.authService.getName();
    console.log(this.role);
  }
  gotoOrderHistory() {
    this.router.navigate(["./trnsctns"], { relativeTo: this.route });
  }
  gotoStore() {
    this.router.navigate(["./shops"], { relativeTo: this.route });
  }
  gotoGallery() {
    this.router.navigate(["./gallery"], { relativeTo: this.route });
  }
  gotoProductMngmnt() {
    this.router.navigate(["./prdcts"], { relativeTo: this.route });
  }
  salesSummary() {
    this.router.navigate(["./slssmry"], { relativeTo: this.route });
  }

  gotoStaff() {
    this.router.navigate(["./staffs"], { relativeTo: this.route });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  drawerLinkClicked() {
    this.drawerCheckbox.nativeElement.checked = false;
  }

  checkHaveAccess(description) {
    let x = false;
    this.features.map((feature) => {
      if (feature.description.includes(description)) {
        x = true;
      }
    });

    return x;
  }
}
