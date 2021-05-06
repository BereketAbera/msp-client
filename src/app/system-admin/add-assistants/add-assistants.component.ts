import { Router } from "@angular/router";
import { AdminService } from "src/app/service/admin.service";
import { SellerStaffService } from "./../../service/seller-staff.service";
import { debounceTime } from "rxjs/operators";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-assistants",
  templateUrl: "./add-assistants.component.html",
  styleUrls: ["./add-assistants.component.scss"]
})
export class AddAssistantsComponent implements OnInit {
  addAssistantForm: FormGroup;
  prevValue = "";
  errorMessage = "";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.addAssistantForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phoneNumber: ["", [Validators.required, Validators.pattern(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/)]]
    });

    this.addAssistantForm.controls["phoneNumber"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
  }

  onSubmit() {
    if (this.addAssistantForm.valid) {
      this.adminService
        .addAssistant({
          ...this.addAssistantForm.value,
          phoneNumber: this.phoneChangeFormat(
            this.addAssistantForm.controls["phoneNumber"].value,
            "db"
          )
        })
        .subscribe((response) => {
          console.log(response);
          if (response.success) {
            this.router.navigate(["/tlgu-admin/assistant"]);
          } else {
            this.errorMessage = response.message;
          }
        });
    }
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
      this.addAssistantForm.controls["phoneNumber"].setValue(val.slice(0, val.length - 1));
      return;
    }
    let lk = val[val.length - 1];
    if (this.prevValue.length < val.length) {
      if (lk && ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)) {
        if (val.length == 3) {
          if (val[0] == "1" || val[0] == "0") {
            this.addAssistantForm.controls["phoneNumber"].setValue(val.slice(1));
          }
        } else if (val.length == 4) {
          this.addAssistantForm.controls["phoneNumber"].setValue(`(${val.slice(0, 3)}) ${val[3]}`);
        } else if (val.length == 10) {
          this.addAssistantForm.controls["phoneNumber"].setValue(`${val.slice(0, 9)}-${val[9]}`);
        }
      } else if (lk) {
        this.addAssistantForm.controls["phoneNumber"].setValue(val.slice(0, val.length - 1));
      }
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)) {
        this.prevValue = value;
      }
    } else {
      if (val.length == 3) {
        if (val[0] == "1" || val[0] == "0") {
          this.addAssistantForm.controls["phoneNumber"].setValue(val.slice(1));
        }
      }
      if (val[val.length - 1] == " " && val.length == 6) {
        this.addAssistantForm.controls["phoneNumber"].setValue(`${val.slice(1, 4)}`);
        this.prevValue = val.slice(1, 4);
      } else if (isNaN(val) && val.length <= 4) {
        this.addAssistantForm.controls["phoneNumber"].setValue(`${val.replace(/\D/g, "")}`);
      } else {
        this.prevValue = this.addAssistantForm.controls["phoneNumber"].value;
      }
    }
  }

  phoneNumberChangeEvent(event) {
    let val = event.target.value;
    if (val.length >= 14) {
      let x = val.search(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/);
      if (x != -1) {
        let str = val.slice(x, x + 14);
        this.addAssistantForm.controls["phoneNumber"].setValue(str);
      } else {
        this.addAssistantForm.controls["phoneNumber"].setValue("");
      }
    }
  }

  gotoAssistants() {}

  preventPaste(event) {
    event.preventDefault();
  }
}
