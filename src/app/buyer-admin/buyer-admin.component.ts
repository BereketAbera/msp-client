import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthService } from "./../service/auth.service";

@Component({
  selector: "app-buyer-admin",
  templateUrl: "./buyer-admin.component.html",
  styleUrls: ["./buyer-admin.component.scss"],
})
export class BuyerAdminComponent implements OnInit {
  today = new Date().getFullYear();
  progressBarActive = false;
  version = environment.version;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.progressBarActive.subscribe((value) => {
      this.progressBarActive = value;
    });
  }
}
