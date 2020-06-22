import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthService } from "./../service/auth.service";

@Component({
  selector: "app-seller-admin",
  templateUrl: "./seller-admin.component.html",
  styleUrls: ["./seller-admin.component.scss"],
})
export class SellerAdminComponent implements OnInit {
  today = new Date().getFullYear();
  version = environment.version;
  progressBarActive = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.progressBarActive.subscribe((value) => {
      this.progressBarActive = value;
    });
  }
}
