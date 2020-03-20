import { Component, OnInit } from "@angular/core";
import { SellerStaffService } from "src/app/service/seller-staff.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-staffs",
  templateUrl: "./staffs.component.html",
  styleUrls: ["./staffs.component.scss"]
})
export class StaffsComponent implements OnInit {
  dataSource: any;
  displayedColumns = [
    "username",
    "email",
    "firstName",
    "lastName",
    "phoneNumber",
    "status",
    "actions"
  ];

  constructor(
    private sellerStaffService: SellerStaffService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sellerStaffService.getStaffs().subscribe(response => {
      if (response.success) {
        this.dataSource = response.staffs;
      } else {
        console.log("error");
      }
    });
  }

  goToAddStaff() {
    this.router.navigate(["./add"], { relativeTo: this.route });
  }

  updateStaff(id, value) {
    this.sellerStaffService
      .updateStaff({ staffId: id, staff_status: value })
      .subscribe(response => {
        if (response.success) {
          this.dataSource = this.dataSource.map(ds => {
            if (ds.id == id) {
              ds.staff_status = value;
            }
            return ds;
          });
        }
      });
  }
}
