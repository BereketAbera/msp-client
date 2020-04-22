import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../service/auth.service";

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.name = this.authService.getName();
    this.role = this.authService.getRole();
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
}
