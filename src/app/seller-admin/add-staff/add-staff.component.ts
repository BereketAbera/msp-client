import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SellerStaffService } from "src/app/service/seller-staff.service";
import { debounceTime, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-add-staff",
  templateUrl: "./add-staff.component.html",
  styleUrls: ["./add-staff.component.scss"],
})
export class AddStaffComponent implements OnInit {
  addStaffForm: FormGroup;
  errorMessage = "";
  prevValue = "";

  constructor(
    private formBuilder: FormBuilder,
    private sellerStaffSerevice: SellerStaffService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.addStaffForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phoneNumber: [
        "",
        [
          Validators.required,
          Validators.pattern(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/),
        ],
      ],
    });

    this.addStaffForm.controls["phoneNumber"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
  }
  gotoSellAdmin() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  onSubmit() {
    if (this.addStaffForm.valid) {
      this.sellerStaffSerevice
        .addStaff({
          ...this.addStaffForm.value,
          phoneNumber: this.phoneChangeFormat(
            this.addStaffForm.controls["phoneNumber"].value,
            "db"
          ),
        })
        .subscribe((response) => {
          if (response.success) {
            this.router.navigate(["/tlgu-slr/staffs"]);
          } else {
            this.errorMessage = response.message;
          }
        });
    }
  }

  preventPaste(event) {
    event.preventDefault();
  }

  phoneChangeFormat(value, type) {
    if (type == "db") {
      return "+1" + value.replace(/[()-\s]/g, "");
    } else {
      let v = value.replace("+1", "");
      return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
    }
  }

  phoneNumberChange(value) {
    let val = value;
    if (val.length > 14) {
      this.addStaffForm.controls["phoneNumber"].setValue(
        val.slice(0, val.length - 1)
      );
      return;
    }
    let lk = val[val.length - 1];
    if (this.prevValue.length < val.length) {
      if (
        lk &&
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)
      ) {
        if (val.length == 3) {
          if (val[0] == "1" || val[0] == "0") {
            this.addStaffForm.controls["phoneNumber"].setValue(val.slice(1));
          }
        } else if (val.length == 4) {
          this.addStaffForm.controls["phoneNumber"].setValue(
            `(${val.slice(0, 3)}) ${val[3]}`
          );
        } else if (val.length == 10) {
          this.addStaffForm.controls["phoneNumber"].setValue(
            `${val.slice(0, 9)}-${val[9]}`
          );
        }
      } else if (lk) {
        this.addStaffForm.controls["phoneNumber"].setValue(
          val.slice(0, val.length - 1)
        );
      }
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)) {
        this.prevValue = value;
      }
    } else {
      if (val.length == 3) {
        if (val[0] == "1" || val[0] == "0") {
          this.addStaffForm.controls["phoneNumber"].setValue(val.slice(1));
        }
      }
      if (val[val.length - 1] == " " && val.length == 6) {
        this.addStaffForm.controls["phoneNumber"].setValue(
          `${val.slice(1, 4)}`
        );
        this.prevValue = val.slice(1, 4);
      } else if (isNaN(val) && val.length <= 4) {
        this.addStaffForm.controls["phoneNumber"].setValue(
          `${val.replace(/\D/g, "")}`
        );
      } else {
        this.prevValue = this.addStaffForm.controls["phoneNumber"].value;
      }
    }
  }
}
