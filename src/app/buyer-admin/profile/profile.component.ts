import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { debounceTime, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  edit = false;
  profile: any = {};
  profileForm: FormGroup;
  showError = false;
  errors = [];
  prevValue = "";

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ profile }) => {
      this.profile = profile;
    });

    this.profileForm = this.fb.group({
      firstName: [
        this.profile.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [this.profile.lastName, Validators.required],
      phoneNumber: [
        this.phoneChangeFormat(this.profile.phoneNumber, "form"),
        [
          Validators.required,
          Validators.pattern(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/),
        ],
      ],
    });

    this.profileForm.controls["phoneNumber"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
  }

  toggleEdit() {
    this.profileForm.controls["phoneNumber"].setValue(
      this.phoneChangeFormat(this.profile.phoneNumber, "form")
    );
    this.edit = !this.edit;
  }

  onSubmit() {
    console.log(this.profileForm.valid);
    if (this.profileForm.valid) {
      let phoneNumber = this.profileForm.controls["phoneNumber"];
      phoneNumber.setValue(this.phoneChangeFormat(phoneNumber.value, "db"));
      this.userService
        .updateProfile({ ...this.profileForm.value, id: this.profile.id })
        .subscribe(
          (res) => {
            if (res.success) {
              this.profile = { ...this.profile, ...this.profileForm.value };
              this.toggleEdit();
            }
          },
          (err) => console.log(err)
        );
    }
  }

  phoneNumberChange(value) {
    let val = value;
    if (val.length > 14) {
      this.profileForm.controls["phoneNumber"].setValue(
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
            this.profileForm.controls["phoneNumber"].setValue(val.slice(1));
          }
        } else if (val.length == 4) {
          this.profileForm.controls["phoneNumber"].setValue(
            `(${val.slice(0, 3)}) ${val[3]}`
          );
        } else if (val.length == 10) {
          this.profileForm.controls["phoneNumber"].setValue(
            `${val.slice(0, 9)}-${val[9]}`
          );
        }
      } else if (lk) {
        this.profileForm.controls["phoneNumber"].setValue(
          val.slice(0, val.length - 1)
        );
      }
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)) {
        this.prevValue = value;
      }
    } else {
      if (val.length == 3) {
        if (val[0] == "1" || val[0] == "0") {
          this.profileForm.controls["phoneNumber"].setValue(val.slice(1));
        }
      }
      if (val[val.length - 1] == " " && val.length == 6) {
        this.profileForm.controls["phoneNumber"].setValue(`${val.slice(1, 4)}`);
        this.prevValue = val.slice(1, 4);
      } else if (isNaN(val) && val.length <= 4) {
        this.profileForm.controls["phoneNumber"].setValue(
          `${val.replace(/\D/g, "")}`
        );
      } else {
        this.prevValue = this.profileForm.controls["phoneNumber"].value;
      }
    }
  }

  phoneNumberChangeEvent(event) {
    let val = event.target.value;
    if (val.length >= 14) {
      let x = val.search(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/);
      if (x != -1) {
        let str = val.slice(x, x + 14);
        this.profileForm.controls["phoneNumber"].setValue(str);
      } else {
        this.profileForm.controls["phoneNumber"].setValue("");
      }
    }
  }

  preventPaste(event) {
    event.preventDefault();
  }

  checkInput(event) {
    if (
      !(
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode == 8
      )
    ) {
      return false;
    }
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
