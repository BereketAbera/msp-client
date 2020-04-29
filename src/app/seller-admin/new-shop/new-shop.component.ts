import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable, Subject } from "rxjs";
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
  private searchText$ = new Subject<string>();

  //shopName = new FormControl("",Validators.required);
  shopForm = this.fb.group({
    shopName: ["", [Validators.required, Validators.minLength(2)]],
    address: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    zipCode: ["", Validators.required],
    telephone: ["", Validators.required],
    contact: ["", Validators.required],
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
    this.route.data.subscribe((data: { states: State[] }) => {
      this.states = data.states;
    });
  }
  searchZipCods(searchInp: string) {
    this.searchText$.next(searchInp);
  }
  onSubmit() {
    let shop = new Shop();
    shop = { ...this.shopForm.value };
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
    console.log(zipCode);
  }
  gotoShopList() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  showForm() {
    return this.authService.isAccountActive();
  }

  getlocations(q) {
    if (q.length > 2) {
      this.zipcodeService.searchAddress(q).subscribe(
        (response) => {
          this.zipCodeHints = response;
        },
        (err) => console.log(err)
      );
    }
  }
}
