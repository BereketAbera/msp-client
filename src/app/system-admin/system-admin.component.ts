import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-system-admin",
  templateUrl: "./system-admin.component.html",
  styleUrls: ["./system-admin.component.scss"],
})
export class SystemAdminComponent implements OnInit {
  today = new Date().getFullYear();
  version = environment.version;
  constructor() {}

  ngOnInit() {}
}
