import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  edit = false;
  profile: any;
  profileForm: FormGroup;
  showError = false;
  errors = [];

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
      companyName: [
        this.profile.companyName,
        [Validators.required, Validators.minLength(2)],
      ],
      companyAddress: [this.profile.companyAddress, Validators.required],
      phoneNumber: [
        this.profile.phoneNumber,
        [
          Validators.required,
          Validators.pattern(
            /1?\s?((\(\d{3}\))|(\d{3}))(-|\s)?\d{3}(-|\s)?\d{4}/
          ),
        ],
      ],
      websiteURL: [this.profile.websiteURL, Validators.required],
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      let phoneNumber = this.profileForm.controls["phoneNumber"];
      phoneNumber.setValue(
        parsePhoneNumberFromString(phoneNumber.value, "US").number
      );
      this.userService.updateSellerProfile(this.profileForm.value).subscribe(
        (res) => {
          if (res.success) {
            this.profile = res.profile;
            this.toggleEdit();
          }
        },
        (err) => console.log(err)
      );
    }
  }

  phoneNumberChange(event) {
    let val = event.target.value;
    let obj = new AsYouType("US");
    let newVal = obj.input(val);
    if (obj) {
      this.profileForm.controls["phoneNumber"].setValue(newVal);
    }
  }
}
