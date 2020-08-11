import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { of, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators/debounceTime";
import { switchMap } from "rxjs/operators/switchMap";
import { Category } from "src/app/model/category";
import { Shop } from "../../model/shop";
import { State } from "../../model/state";
import { ZipCode } from "../../model/zipCode";
import { AuthService } from "../../service/auth.service";
import { GeocoderService } from "../../service/geocoder.service";
import { ShopsService } from "../../service/shops.service";
import { StateService } from "../../service/state.service";
import { ZipcodeService } from "../../service/zipcode.service";

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
  zipCodeHints: ZipCode[];
  states: State[];
  prevValue = "";
  valueSet = false;
  categories: any;
  private searchText$ = new Subject<string>();

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
    telephone: [
      "",
      [Validators.required, Validators.pattern(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/)],
    ],
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

    this.shopForm.controls["telephone"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
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
      return;
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

  phoneNumberChange(value) {
    let val = value;
    if (val.length > 14) {
      this.shopForm.controls["telephone"].setValue(
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
      } else if (lk) {
        this.shopForm.controls["telephone"].setValue(
          val.slice(0, val.length - 1)
        );
      }
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(lk)) {
        this.prevValue = value;
      }
    } else {
      if (val.length == 3) {
        if (val[0] == "1" || val[0] == "0") {
          this.shopForm.controls["telephone"].setValue(val.slice(1));
        }
      }
      if (val[val.length - 1] == " " && val.length == 6) {
        this.shopForm.controls["telephone"].setValue(`${val.slice(1, 4)}`);
        this.prevValue = val.slice(1, 4);
      } else if (isNaN(val) && val.length <= 4) {
        this.shopForm.controls["telephone"].setValue(
          `${val.replace(/\D/g, "")}`
        );
      } else {
        this.prevValue = this.shopForm.controls["telephone"].value;
      }
    }
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
