import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-buyer-navigation",
  templateUrl: "./buyer-navigation.component.html",
  styleUrls: ["./buyer-navigation.component.scss"],
})
export class BuyerNavigationComponent implements OnInit {
  background = "primary";
  links = [];
  name: string = "";
  @ViewChild("drawerCheckbox") drawerCheckbox: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.name = this.authService.getName();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
  menuOpened() {
    //console.log("Menu is open");
  }

  drawerLinkClicked() {
    this.drawerCheckbox.nativeElement.checked = false;
  }
}
