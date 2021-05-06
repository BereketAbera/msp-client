import { AdminService } from "src/app/service/admin.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-assistants",
  templateUrl: "./assistants.component.html",
  styleUrls: ["./assistants.component.scss"]
})
export class AssistantsComponent implements OnInit {
  dataSource: any;
  displayedColumns = ["username", "phoneNumber", "email", "firstName", "lastName"];
  count = 0;
  page = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}
  ngOnInit() {
    this.route.data.subscribe(({ assistants }) => {
      this.dataSource = assistants.assistants.row;
      this.count = assistants.assistants.count;
    });

    this.adminService.getAssistants(1).subscribe((response) => {
      if (response.success) {
        this.dataSource = response.assistants.rows;
        this.count = response.assistants.count;
      } else {
        console.log("error");
      }
    });
  }

  goToAddAssistant() {
    this.router.navigate(["./add"], { relativeTo: this.route });
  }

  getServerData(event) {
    this.page = event.pageIndex + 1;
    this.adminService.getAssistants(this.page).subscribe((response) => {
      if (response.success) {
        this.dataSource = response.staffs.rows;
        this.count = response.staffs.count;
      } else {
        console.log("error");
      }
    });
  }

  phoneChangeFormat(value, type) {
    if (type == "db") {
      return "+1" + value.replace(/[()-\s]/g, "");
    } else {
      let v = value.replace("+1", "");
      return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
    }
  }
}
