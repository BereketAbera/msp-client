import { ShopsService } from "./../../service/shops.service";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { State } from "src/app/model/state";
import { ZipCode } from "src/app/model/zipCode";
import { Subject, of } from "rxjs";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { AuthService } from "src/app/service/auth.service";
import { MatSnackBar } from "@angular/material";
import { GeocoderService } from "src/app/service/geocoder.service";
import { ZipcodeService } from "src/app/service/zipcode.service";
import { Shop } from "src/app/model/shop";
import { debounceTime } from "rxjs/operators/debounceTime";
import { switchMap } from "rxjs/operators/switchMap";

let zipCodeHints = [];

@Component({
  selector: "app-edit-shop",
  templateUrl: "./edit-shop.component.html",
  styleUrls: ["./edit-shop.component.scss"],
})
export class EditShopComponent implements OnInit {
  [x: string]: any;
  showError: boolean = false;
  errors = [];
  zipCodeHints: ZipCode[] = [];
  states: State[];
  private searchText$ = new Subject<string>();
  lng: any = 24.9433353;
  shop: any;
  shopForm: FormGroup;
  prevValue = "";
  valueSet = false;

  constructor(
    private authService: AuthService,
    private shopsSrvc: ShopsService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private zipcodeService: ZipcodeService,
    private location: Location
  ) {
    this.route.data.subscribe((data: { states: State[]; shop: any }) => {
      this.states = data.states;
      this.shop = data.shop;
      console.log(this.shop);
    });

    this.shopForm = this.fb.group({
      shopName: [
        this.shop.name,
        [Validators.required, Validators.minLength(2)],
      ],
      address: [this.shop.address, Validators.required],
      city: [this.shop.city, Validators.required],
      state: [this.shop.state],
      zipCode: [
        this.shop.zipCode,
        [Validators.required, Validators.pattern(/\d{5}/)],
        zipCodeValidator,
      ],
      telephone: [
        this.phoneChangeFormat(this.shop.phone, "form"),
        [
          Validators.required,
          Validators.pattern(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/),
        ],
      ],
      contact: [this.shop.contact, Validators.required],
    });
  }
  close() {
    this.showError = false;
  }
  ngOnInit() {
    this.shopForm.controls["zipCode"].valueChanges
      .pipe(
        debounceTime(200),
        switchMap((term) => this.zipcodeService.searchAddress(term))
      )
      .subscribe((zipCodeHints) => this.getlocations(zipCodeHints));

    this.shopForm.controls["zipCode"].setValue(this.shop.zipCode);

    this.shopForm.controls["telephone"].valueChanges
      .pipe((debounceTime(200), switchMap((term) => of(term))))
      .subscribe((res) => this.phoneNumberChange(res));
  }
  searchZipCods(searchInp: string) {
    this.searchText$.next(searchInp);
  }
  onSubmit() {
    // console.log(this.shopForm.value);
    window.scrollTo(0, 0);
    if (this.shopForm.valid) {
      let shop = new Shop();
      shop = { ...this.shopForm.value };
      this.shopsSrvc
        .updateShop({
          ...shop,
          id: this.shop.id,
          telephone: this.phoneChangeFormat(
            this.shopForm.controls["telephone"].value,
            "db"
          ),
        })
        .subscribe((res) => {
          if (res["success"])
            this.router.navigate(["../../"], { relativeTo: this.route });
          else {
            this.showError = true;
            this.errors = res["messages"];
          }
        });
    }
  }
  displayFn(zipCode: any) {
    // console.log(zipCode);
  }
  gotoShopList() {
    this.location.back();
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

    console.log(zipCodeFound);

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
      this.registrationForm.controls["phoneNumber"].setValue(
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
