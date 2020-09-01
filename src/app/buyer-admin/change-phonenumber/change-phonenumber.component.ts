import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { debounceTime, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "buyer-change-phonenumber",
  templateUrl: "./change-phonenumber.component.html",
  styleUrls: ["./change-phonenumber.component.scss"],
})
export class ChangePhonenumberComponent implements OnInit {
  chnagePhoneNumber = this.fb.group({
    phoneNumber: [
      this.phoneChangeFormat(this.data.phoneNumber, "form"),
      [Validators.required, Validators.pattern(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/)],
    ],
  });
  prevValue = "";
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePhonenumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.chnagePhoneNumber.controls["phoneNumber"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
  }

  phoneNumberChange(value) {
    let val = value;
    if (val.length > 14) {
      this.chnagePhoneNumber.controls["phoneNumber"].setValue(
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
            this.chnagePhoneNumber.controls["phoneNumber"].setValue(
              val.slice(1)
            );
          }
        } else if (val.length == 4) {
          this.chnagePhoneNumber.controls["phoneNumber"].setValue(
            `(${val.slice(0, 3)}) ${val[3]}`
          );
        } else if (val.length == 10) {
          this.chnagePhoneNumber.controls["phoneNumber"].setValue(
            `${val.slice(0, 9)}-${val[9]}`
          );
        }
      } else if (lk) {
        this.chnagePhoneNumber.controls["phoneNumber"].setValue(
          val.slice(0, val.length - 1)
        );
      }
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)) {
        this.prevValue = value;
      }
    } else {
      if (val.length == 3) {
        if (val[0] == "1" || val[0] == "0") {
          this.chnagePhoneNumber.controls["phoneNumber"].setValue(val.slice(1));
        }
      }
      if (val[val.length - 1] == " " && val.length == 6) {
        this.chnagePhoneNumber.controls["phoneNumber"].setValue(
          `${val.slice(1, 4)}`
        );
        this.prevValue = val.slice(1, 4);
      } else if (isNaN(val) && val.length <= 4) {
        this.chnagePhoneNumber.controls["phoneNumber"].setValue(
          `${val.replace(/\D/g, "")}`
        );
      } else {
        this.prevValue = this.chnagePhoneNumber.controls["phoneNumber"].value;
      }
    }
  }

  phoneNumberChangeEvent(event) {
    let val = event.target.value;
    if (val.length >= 14) {
      let x = val.search(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/);
      if (x != -1) {
        let str = val.slice(x, x + 14);
        this.chnagePhoneNumber.controls["phoneNumber"].setValue(str);
      } else {
        this.chnagePhoneNumber.controls["phoneNumber"].setValue("");
      }
    }
  }

  preventPaste(event) {
    event.preventDefault();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  phoneChangeFormat(value, type) {
    if (type == "db") {
      return "+1" + value.replace(/[()-\s]/g, "");
    } else {
      let v = value.replace("+1", "").replace(/[()-\s]/g, "");
      return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
    }
  }
}
