import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SellerStaffService } from "src/app/service/seller-staff.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-staff",
  templateUrl: "./add-staff.component.html",
  styleUrls: ["./add-staff.component.scss"]
})
export class AddStaffComponent implements OnInit {
  addStaffForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sellerStaffSerevice: SellerStaffService,
    private router: Router
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

  onSubmit() {
    if (this.addStaffForm.valid) {
      this.sellerStaffSerevice
        .addStaff(this.addStaffForm.value)
        .subscribe(response => {
          if (response.success) {
            this.router.navigate(["/tlgu-slr/staffs"]);
          } else {
            alert("error occurred");
          }
        });
    }
  }
}
