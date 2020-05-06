import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-buyer-admin",
  templateUrl: "./buyer-admin.component.html",
  styleUrls: ["./buyer-admin.component.scss"],
})
export class BuyerAdminComponent implements OnInit {
  today = new Date().getFullYear();
  version = environment.version;

  ngOnInit() {}
}
