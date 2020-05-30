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
  profile: any = {};
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
      firstName: [
        this.profile.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [this.profile.lastName, Validators.required],
      phoneNumber: [this.profile.phoneNumber, Validators.required],
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  onSubmit() {
    console.log(this.profileForm.valid);
    if (this.profileForm.valid) {
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
}
