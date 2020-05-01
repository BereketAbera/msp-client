import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/service/user.service";

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
      phoneNumber: [this.profile.phoneNumber, Validators.required],
      websiteURL: [this.profile.websiteURL, Validators.required],
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  onSubmit() {
    if (this.profileForm.valid) {
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
}
