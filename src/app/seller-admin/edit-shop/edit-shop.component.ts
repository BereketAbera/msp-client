import { ShopsService } from "./../../service/shops.service";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { State } from "src/app/model/state";
import { ZipCode } from "src/app/model/zipCode";
import { Subject } from "rxjs";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/service/auth.service";
import { MatSnackBar } from "@angular/material";
import { GeocoderService } from "src/app/service/geocoder.service";
import { ZipcodeService } from "src/app/service/zipcode.service";
import { Shop } from "src/app/model/shop";

@Component({
  selector: "app-edit-shop",
  templateUrl: "./edit-shop.component.html",
  styleUrls: ["./edit-shop.component.scss"],
})
export class EditShopComponent implements OnInit {
  [x: string]: any;
  showError: boolean = false;
  errors = [];
  // zipCodeHints$ = new Observable<ZipCode[]>();
  zipCodeHints: ZipCode[];
  states: State[];
  private searchText$ = new Subject<string>();
  lng: any = 24.9433353;
  shop: any;
  shopForm: FormGroup;

  //shopName = new FormControl("",Validators.required);

  constructor(
    private authService: AuthService,
    private shopsSrvc: ShopsService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private geocoderService: GeocoderService,
    private zipcodeService: ZipcodeService,
    private location: Location
  ) {}
  close() {
    this.showError = false;
  }
  ngOnInit() {
    this.route.data.subscribe((data: { states: State[]; shop: any }) => {
      this.states = data.states;
      this.shop = data.shop;
      // console.log(this.shop);
    });

    this.shopForm = this.fb.group({
      shopName: [
        this.shop.name,
        [Validators.required, Validators.minLength(2)],
      ],
      address: [this.shop.address, Validators.required],
      city: [this.shop.city, Validators.required],
      state: [this.shop.state],
      zipCode: [this.shop.zipCode, Validators.required],
      telephone: [this.shop.phone, Validators.required],
      contact: [this.shop.contact, Validators.required],
    });
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
        .updateShop({ ...shop, id: this.shop.id })
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

  getlocations(q) {
    let zipCodeFound = false;
    if (q.length > 2) {
      this.shopForm.get("zipCode").setValue(q);
      this.zipcodeService.searchAddress(q).subscribe(
        (response) => {
          this.zipCodeHints = response;
          this.zipCodeHints.map((zipcode) => {
            if (this.shopForm.get("zipCode").value == zipcode.ZIPCode) {
              zipCodeFound = true;
              let id = this.getStateId(zipcode.StateAbbr);
              this.shopForm.get("state").setValue(id);
            }
          });
          if (!zipCodeFound) {
            this.shopForm.get("state").setValue("");
          }
        },
        (err) => console.log(err)
      );
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
}
