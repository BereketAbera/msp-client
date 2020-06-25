import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  today = new Date().getFullYear();
  version = environment.version;
  progressBarActive = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.progressBarActive.subscribe((value) => {
      this.progressBarActive = value;
    });
  }
}
