import { ChangePhonenumberComponent } from "./../change-phonenumber/change-phonenumber.component";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { debounceTime, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  edit = false;
  edit_phoneNumber = false;
  editUserProfile = false;
  editUserPhoneNumber = false;
  profile: any;
  userProfile: any;
  profileForm: FormGroup;
  userProfileForm: FormGroup;
  showError = false;
  errors = [];
  prevValue = "";
  type = "";
  message = "";
  successMessage = "";
  showSuccessNotification = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ profile, userProfile }) => {
      this.profile = profile;
      this.userProfile = userProfile;
    });

    this.profileForm = this.fb.group({
      companyName: [
        this.profile.companyName,
        [Validators.required, Validators.minLength(2)],
      ],
      companyAddress: [this.profile.companyAddress, Validators.required],
      websiteURL: [this.profile.websiteURL],
    });

    this.userProfileForm = this.fb.group({
      firstName: [
        this.userProfile.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [this.userProfile.lastName, Validators.required],
    });
  }

  toggleEdit(type = "") {
    this.type = type;
    this.edit_phoneNumber = !this.edit_phoneNumber;
    this.editUserPhoneNumber = !this.editUserPhoneNumber;
    this.edit = !this.edit;
    this.editUserProfile = !this.editUserProfile;
  }

  togglePhoneNumberEdit(type) {
    const dialogRef = this.dialog.open(ChangePhonenumberComponent, {
      width: "400px",
      height: "auto",
      data: {
        phoneNumber:
          type == "user"
            ? this.userProfile.phoneNumber
            : this.profile.phoneNumber,
      },
    });

    dialogRef.afterClosed().subscribe((phoneNumber) => {
      if (phoneNumber) {
        phoneNumber = this.phoneChangeFormat(phoneNumber, "db");
        this.userService.sendPhonenNumberCode(phoneNumber).subscribe((res) => {
          // console.log(res);
          if (res.success) {
            this.router.navigate(["/tlgu-slr/confirm_phonenumber_code"], {
              queryParams: { phoneNumber, type },
            });
          } else {
            this.message = "Please try again after 1 minute.";
          }
        });
      }
    });
  }

  onSubmit() {
    this.showSuccessNotification = false;
    if (this.profileForm.valid) {
      this.userService.updateSellerProfile(this.profileForm.value).subscribe(
        (res) => {
          if (res.success) {
            this.profile = res.profile;
            this.toggleEdit();
            this.showSuccessNotification = true;
            this.successMessage = "Successfully changed profile";
          }
        },
        (err) => console.log(err)
      );
    }
  }

  onUserProfileSubmit() {
    this.showSuccessNotification = false;
    if (this.userProfileForm.valid) {
      this.userService
        .updateProfile({
          ...this.userProfileForm.value,
          id: this.userProfile.id,
        })
        .subscribe(
          (res) => {
            if (res.success) {
              this.userProfile = {
                ...this.userProfile,
                ...this.userProfileForm.value,
              };

              this.toggleEdit();
              this.showSuccessNotification = true;
              this.successMessage = "Successfully changed account";
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
      let v = value.replace("+1", "");
      return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
    }
  }
}
