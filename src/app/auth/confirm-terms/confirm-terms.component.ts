import { ZipcodeService } from "./../../service/zipcode.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ZipCode } from "@app/model/zipCode";
import { Validators, FormControl, FormBuilder } from "@angular/forms";
import { State } from "@app/model/state";
import { of } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import { StateService } from "@app/service/state.service";
// import { switchMap } from "rxjs-compat/operator/switchMap";

let zipCodeHints = [];

@Component({
  selector: "app-confirm-terms",
  templateUrl: "./confirm-terms.component.html",
  styleUrls: ["./confirm-terms.component.scss"],
})
export class ConfirmTermsComponent implements OnInit {
  zipCodeHints: ZipCode[];
  states: State[];
  registrationForm = this.fb.group({
    zipcode: [
      "",
      [Validators.required, Validators.pattern(/\d{5}/)],
      zipCodeValidator,
    ],
    city: ["", Validators.required],
    state: [""],
    agreed: [false, Validators.required],

    // subCategoryId: ["", Validators.required],
  });
  valueSet = true;
  constructor(
    public dialogRef: MatDialogRef<ConfirmTermsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private zipcodeService: ZipcodeService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.stateService.listStates().subscribe((res) => {
      this.states = res;
    });
    this.registrationForm.controls["zipcode"].valueChanges
      .pipe(
        debounceTime(200),
        switchMap((term) => this.zipcodeService.searchAddress(term))
      )
      .subscribe((zipCodeHints) => this.getlocations(zipCodeHints));
    // console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getlocations(zipCodes) {
    // console.log(zipCodes);
    let zipCodeFound = false;
    this.zipCodeHints = zipCodes;
    zipCodeHints = this.zipCodeHints;
    if (
      this.registrationForm.controls["zipcode"].value.length == 5 &&
      !this.valueSet
    ) {
      this.valueSet = true;
      this.registrationForm
        .get("zipcode")
        .setValue(this.registrationForm.controls["zipcode"].value);
    } else {
      this.valueSet = false;
    }
    this.zipCodeHints.map((zipcode) => {
      if (this.registrationForm.get("zipcode").value == zipcode.ZIPCode) {
        zipCodeFound = true;
        this.registrationForm
          .get("state")
          .setValue(this.getStateName(zipcode.StateAbbr));
      }
    });
    if (!zipCodeFound) {
      this.registrationForm.get("state").setValue("");
    }
  }

  zipCodeSelected(zipcode) {
    this.registrationForm
      .get("state")
      .setValue(this.getStateName(zipcode.StateAbbr));
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

  getStateName(abbr) {
    let name = null;
    this.states.map((state) => {
      if (state.abbreviation == abbr) {
        name = state.name;
      }
    });

    return name;
  }
}
function zipCodeValidator(control: FormControl) {
  let zipCode = control.value;

  let found = false;

  zipCodeHints.map((zch) => {
    if (zch.ZIPCode == zipCode) {
      found = true;
    }
  });
  // console.log(zipCodeHints, found, zipCode);
  return found ? of(null) : of({ error: "zipcode is not valid" });
}
