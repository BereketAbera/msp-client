import { ZipcodeService } from "./../../service/zipcode.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ProductService } from "../../service/product.service";
import { AuthService } from "../../service/auth.service";
import { Category } from "../../model/category";

import { WindowRef } from "../../service/window.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-public-products",
  templateUrl: "./public-products.component.html",
  styleUrls: ["./public-products.component.scss"],
})
export class PublicProductsComponent implements OnInit {
  @ViewChild("anchor") anchor: ElementRef<HTMLElement>;
  @ViewChild("locationInput") locationInput: ElementRef<HTMLElement>;
  query: string;
  searchInput = new FormControl("");
  products: any = [];
  products1: any = [];
  products2: any = [];
  isUP: boolean = false;
  categories: Category[];
  activeCategories: Category[];
  page = 1;
  pageSize = 6;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  subCatagory: number | string = 0;
  lat: number = 0;
  lng: number = 0;
  distance: number = 0;
  companies: any = [];
  productProject = [];
  address: any;
  addresses: any;
  categoryOptionsActive = false;
  locationInputActive = false;
  category: Category = new Category();
  categoryId: any;

  constructor(
    private winRef: WindowRef,
    private router: Router,
    private route: ActivatedRoute,
    private prdctService: ProductService,
    private authService: AuthService,
    private zipcodeService: ZipcodeService
  ) {}
  ngOnInit() {
    this.address = JSON.parse(localStorage.getItem("client_address"));
    if (!this.address) {
      this.router.navigate(["/"]);
    }
    this.route.queryParams.subscribe(
      (response) => {
        this.query = response.q;
        this.categoryId = response.categoryId;
        this.loadFirstTime();
      },
      (err) => console.log(err)
    );

    this.route.data.subscribe((data: { categories: Category[] }) => {
      this.categories = data.categories;
    });
    this.loadFirstTime();
    this.loadJobs();
  }

  loadFirstTime() {
    this.companies = [];
    if (this.address && this.address.Latitude && this.address.Longitude) {
      this.authService.progressBarActive.next(true);
      this.prdctService
        .listCompaniesProducts(
          1,
          this.address.Latitude,
          this.address.Longitude,
          this.categoryId
        )
        .subscribe((company) => {
          this.companies = company;

          this.page = this.page + 1;
          this.authService.progressBarActive.next(false);
        });
    }
  }

  buttonClickScroll() {
    var rightPosition = window.innerHeight + window.pageYOffset;
    var elementPosition = this.anchor ? this.anchor.nativeElement.offsetTop : 0;
    var toPosition = window.innerWidth + window.pageXOffset + 1;
    window.scrollTo(elementPosition - 10, rightPosition);
  }
  loadJobs() {
    // console.log(this.addlatitude, this.longitude);
    window.onscroll = () => {
      var bottomPosition = window.innerHeight + window.pageYOffset;
      var elementPosition = this.anchor
        ? this.anchor.nativeElement.offsetTop
        : 0;
      if (
        bottomPosition > elementPosition &&
        this.shouldLoad &&
        !this.reachedPageEnd &&
        this.address &&
        this.address.Latitude &&
        this.address.Longitude
      ) {
        this.shouldLoad = false;
        this.authService.progressBarActive.next(true);
        this.prdctService
          .listCompaniesProducts(
            this.page,
            this.address.Latitude,
            this.address.Longitude,
            this.categoryId
          )
          .subscribe((company) => {
            //@ts-ignore
            this.companies.push(...company);
            this.page = this.page + 1;
            this.authService.progressBarActive.next(false);
          });
      }
    };
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
  searchByLocation(distance: number) {
    this.distance = distance;
    this.lat = this.authService.currentLat;
    this.lng = this.authService.currentLong;
    this.page = 0;
    this.products = [];
    this.loadFirstTime();
  }
  searchByCtgry(id: number | string) {
    this.subCatagory = id;
    this.page = 0;
    this.products = [];
    this.loadFirstTime();
  }
  gotoCart() {
    this.router.navigate(["cart"]);
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

    this.locationInputActive = true;
  }

  getCategories(q) {
    if (q.length > 1) {
      this.categoryOptionsActive = true;
      this.activeCategories = this.categories
        .filter((ct) => ct.name.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 4);
    }
  }

  addressChanged(address) {
    this.address = address;
    this.getProducts();
    this.locationInputActive = false;
    this.onBlur();
  }

  getProducts() {
    if (this.address) {
      localStorage.setItem("client_address", JSON.stringify(this.address));
      this.authService.updateClientLocation(this.address);
      this.loadFirstTime();
      this.searchInput.setValue("");
      this.categoryOptionsActive = false;
    } else if (this.address) {
      this.addresses = this.address;
      this.loadFirstTime();
    }
  }

  toggleLocationInputActive() {
    this.locationInput.nativeElement.focus();
    this.locationInputActive = true;
    // this.onBlur();
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
          this.address = {
            Latitude: response.coords.latitude,
            Longitude: response.coords.longitude,
          };
          console.log(this.address);
          this.getProducts();
        },
        (err) => console.log(err)
      );
    }
    this.locationInputActive = false;
  }

  onFocus() {
    this.locationInputActive = true;
    this.searchInput.setValue("");
  }

  onBlur() {
    this.searchInput.setValue(
      "Location: " +
        (this.address.CityName ? this.address.CityName : "Your Location")
    );

    this.locationInputActive = false;
  }
}
