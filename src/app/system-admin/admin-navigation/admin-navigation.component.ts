import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "admin-navigation",
  templateUrl: "./admin-navigation.component.html",
  styleUrls: ["./admin-navigation.component.scss"]
})
export class AdminNavigationComponent implements OnInit {
  background = "primary";
  links = [];
  name: string = "";
  @ViewChild("drawerCheckbox", { static: true }) drawerCheckbox: ElementRef;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.name = this.authService.getName().split(" ")[0];
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  sellerClicked() {
    if (this.router.url == "/tlgu-admin") {
      window.location.reload();
    }
  }

  drawerLinkClicked() {
    this.drawerCheckbox.nativeElement.checked = false;
  }
}
