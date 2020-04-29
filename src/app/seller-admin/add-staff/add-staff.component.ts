import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SellerStaffService } from "src/app/service/seller-staff.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-staff",
  templateUrl: "./add-staff.component.html",
  styleUrls: ["./add-staff.component.scss"]
})
export class AddStaffComponent implements OnInit {
  addStaffForm: FormGroup;
  errorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private sellerStaffSerevice: SellerStaffService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.addStaffForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phoneNumber: ["", Validators.required]
    });
  }
  gotoSellAdmin() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  onSubmit() {
    if (this.addStaffForm.valid) {
      this.sellerStaffSerevice
        .addStaff(this.addStaffForm.value)
        .subscribe(response => {
          if (response.success) {
            this.router.navigate(["/tlgu-slr/staffs"]);
          } else {
            this.errorMessage = response.message;
          }
        });
    }
  }
}
