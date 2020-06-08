import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Observable, Subject, of } from "rxjs";
import { debounceTime } from "rxjs/operators/debounceTime";
import { distinctUntilChanged } from "rxjs/operators/distinctUntilChanged";
import { filter } from "rxjs/operators/filter";
import { switchMap } from "rxjs/operators/switchMap";
import { Shop } from "../../model/shop";
import { ZipCode } from "../../model/zipCode";
import { State } from "../../model/state";
import { Router, ActivatedRoute } from "@angular/router";
import { GeocoderService } from "../../service/geocoder.service";
import { ShopsService } from "../../service/shops.service";
import { MatSnackBar } from "@angular/material";
import { ZipcodeService } from "../../service/zipcode.service";
import { StateService } from "../../service/state.service";

import { AuthService } from "../../service/auth.service";
import { Category } from "src/app/model/category";

let zipCodeHints = [];

@Component({
  selector: "app-new-shop",
  templateUrl: "./new-shop.component.html",
  styleUrls: ["./new-shop.component.scss"],
})
export class NewShopComponent implements OnInit {
  [x: string]: any;
  showError: boolean = false;
  errors = [];
  // zipCodeHints$ = new Observable<ZipCode[]>();
  zipCodeHints: ZipCode[];
  states: State[];
  // prevValue = "";
  valueSet = false;
  private searchText$ = new Subject<string>();

  //shopName = new FormControl("",Validators.required);
  shopForm = this.fb.group({
    shopName: ["", [Validators.required, Validators.minLength(2)]],
    address: ["", Validators.required],
    city: ["", Validators.required],
    state: [""],
    zipCode: [
      "",
      [Validators.required, Validators.pattern(/\d{5}/)],
      zipCodeValidator,
    ],
    telephone: ["", Validators.required],
    contact: ["", Validators.required],
    subCategoryId: ["", Validators.required],
  });

  constructor(
    private stateService: StateService,
    private authService: AuthService,
    private shopsSrvc: ShopsService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private geocoderService: GeocoderService,
    private zipcodeService: ZipcodeService
  ) {}
  close() {
    this.showError = false;
  }
  ngOnInit() {
    this.route.data.subscribe(
      (data: { states: State[]; categories: Category[] }) => {
        this.states = data.states;
        this.categories = data.categories;
      }
    );

    this.shopForm.controls["zipCode"].valueChanges
      .pipe(
        debounceTime(200),
        switchMap((term) => this.zipcodeService.searchAddress(term))
      )
      .subscribe((zipCodeHints) => this.getlocations(zipCodeHints));
  }
  searchZipCods(searchInp: string) {
    this.searchText$.next(searchInp);
  }
  onSubmit() {
    let shop = new Shop();
    shop = { ...this.shopForm.value };
    shop.telephone = this.phoneChangeFormat(
      this.shopForm.controls["telephone"].value,
      "db"
    );
    this.shopsSrvc.createShope(shop).subscribe((res) => {
      if (res["success"])
        this.router.navigate(["../"], { relativeTo: this.route });
      else {
        this.showError = true;
        this.errors = res["messages"];
      }
    });
  }
  displayFn(zipCode: any) {
    // console.log(zipCode);
  }
  gotoShopList() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  showForm() {
    return this.authService.isAccountActive();
  }

  getlocations(zipCodes) {
    let zipCodeFound = false;
    this.zipCodeHints = zipCodes;
    zipCodeHints = this.zipCodeHints;
    if (this.shopForm.get("zipCode").value.length == 5 && !this.valueSet) {
      this.valueSet = true;
      this.shopForm.get("zipCode").setValue(this.shopForm.get("zipCode").value);
    } else {
      this.valueSet = false;
    }
    this.zipCodeHints.map((zipcode) => {
      if (this.shopForm.get("zipCode").value == zipcode.ZIPCode) {
        zipCodeFound = true;
        this.shopForm.get("state").setValue(this.getStateId(zipcode.StateAbbr));
      }
    });

    if (!zipCodeFound) {
      this.shopForm.get("state").setValue("");
    }
  }

  getStateId(abbr) {
    let id = null;
    this.states.map((state) => {
      if (state.abbreviation == abbr) {
        id = state.id;
      }
    });

    return id;
  }

  zipCodeSelected(zipcode) {
    this.shopForm.get("state").setValue(this.getStateId(zipcode.StateAbbr));
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

  phoneNumberChange(event) {
    let val = event.target.value;
    if (val.length != this.prevValue.length) {
      if (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode == 8
      ) {
        if (val.length > this.prevValue.length) {
          if (val.length == 3) {
            if (val[0] == "1" || val[0] == "0") {
              this.shopForm.controls["telephone"].setValue(val.slice(1));
            }
          } else if (val.length == 4) {
            this.shopForm.controls["telephone"].setValue(
              `(${val.slice(0, 3)}) ${val[3]}`
            );
          } else if (val.length == 10) {
            this.shopForm.controls["telephone"].setValue(
              `${val.slice(0, 9)}-${val[9]}`
            );
          }
        } else {
          if (this.prevValue[this.prevValue.length - 1] == " ") {
            this.shopForm.controls["telephone"].setValue(`${val.slice(1, 4)}`);
          }
        }
      }
    }

    this.prevValue = event.target.value;
  }

  phoneNumberChangeEvent(event) {
    let val = event.target.value;
    if (val.length >= 14) {
      let x = val.search(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/);
      if (x != -1) {
        let str = val.slice(x, x + 14);
        this.shopForm.controls["telephone"].setValue(str);
      } else {
        this.shopForm.controls["telephone"].setValue("");
      }
    }
  }

  preventPaste(event) {
    event.preventDefault();
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

function zipCodeValidator(control: FormControl) {
  let zipCode = control.value;

  let found = false;

  zipCodeHints.map((zch) => {
    if (zch.ZIPCode == zipCode) {
      found = true;
    }
  });

  return found ? of(null) : of({ error: "zipcode is not valid" });
}
