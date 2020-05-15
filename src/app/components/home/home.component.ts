import { ZipCode } from "./../../model/zipCode";
import { ZipcodeService } from "./../../service/zipcode.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ProductService } from "../../service/product.service";
import { AuthService } from "../../service/auth.service";
import { Category } from "../../model/category";

import { WindowRef } from "../../service/window.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild("anchor") anchor: ElementRef<HTMLElement>;
  searchInput = new FormControl("");
  categories: Category[];
  lat: number = 0;
  lng: number = 0;
  distance: number = 0;
  addresses = [];
  address;
  constructor(
    private winRef: WindowRef,
    private route: ActivatedRoute,
    private authService: AuthService,
    private zipcodeService: ZipcodeService,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.data.subscribe((data: { categories: Category[] }) => {
      this.categories = data.categories;
    });
  }

  ngAfterViewChecked() {}
  isIE() {
    const match = this.winRef.nativeWindow.navigator.userAgent.search(
      /(?:Edge|MSIE|Trident\/.*; rv:)/
    );
    let isIE = false;

    if (match !== -1) {
      isIE = true;
    }

    return isIE;
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getlocations(q) {
    if (q.length > 2) {
      this.zipcodeService.searchAddress(q).subscribe(
        (response) => {
          this.addresses = response;
        },
        (err) => console.log(err)
      );
    }
  }

  addressChanged(address) {
    this.searchInput.setValue(
      `${address.CityName.toString().replace(
        /'/g,
        ""
      )}, ${address.CountyName.toString().replace(
        /'/g,
        ""
      )}, ${address.StateName.toString().replace(/'/g, "")}`
    );
    this.address = address;
    this.getProducts();
  }

  getProducts() {
    if (!this.address) {
      this.addresses.map((address) => {
        if (this.searchInput.value == address.ZIPCode) {
          this.address = address;
          localStorage.setItem("client_address", JSON.stringify(this.address));
          this.authService.updateClientLocation(this.address);
          this.router.navigate(["/products"]);
        }
      });
    } else {
      localStorage.setItem("client_address", JSON.stringify(this.address));
      this.authService.updateClientLocation(this.address);
      this.router.navigate(["/products"]);
    }
  }

  getClientLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (response) => {
          localStorage.setItem(
            "client_address",
            JSON.stringify({
              Latitude: response.coords.latitude,
              Longitude: response.coords.longitude,
            })
          );
          this.authService.updateClientLocation({
            Latitude: response.coords.latitude,
            Longitude: response.coords.longitude,
          });
          this.router.navigate(["/products"]);
        },
        (err) => console.log(err)
      );
    }
  }
}
