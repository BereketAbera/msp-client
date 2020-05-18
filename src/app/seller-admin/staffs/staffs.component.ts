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
  count = 0;
  page = 1;

  constructor(
    private sellerStaffService: SellerStaffService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ staff }) => {
      this.dataSource = staff.staffs.row;
      this.count = staff.staffs.count;
    });

    this.sellerStaffService.getStaffs(1).subscribe(response => {
      if (response.success) {
        this.dataSource = response.staffs.rows;
        this.count = response.staffs.count;
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

  getServerData(event) {
    this.page = event.pageIndex + 1;
    this.sellerStaffService.getStaffs(this.page).subscribe(response => {
      if (response.success) {
        this.dataSource = response.staffs.rows;
      } else {
        console.log("error");
      }
    });
  }

  manageStaff(staffId) {
    this.router.navigate([`tlgu-slr/staffs/manage_access/${staffId}`]);
  }
}
