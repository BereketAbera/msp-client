import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Category } from "../../model/category";
import { AuthService } from "../../service/auth.service";
import { ProductService } from "../../service/product.service";
import { WindowRef } from "../../service/window.service";
import { ZipcodeService } from "./../../service/zipcode.service";

@Component({
  selector: "app-public-products",
  templateUrl: "./public-products.component.html",
  styleUrls: ["./public-products.component.scss"],
})
export class PublicProductsComponent implements OnInit {
  @ViewChild("anchor", { static: true }) anchor: ElementRef<HTMLElement>;
  @ViewChild("locationInput", { static: true }) locationInput: ElementRef<
    HTMLElement
  >;
  query: string = "";
  searchInput = new FormControl("");
  categories: Category[];
  activeCategories: Category[];
  page = 1;
  pageSize = 3;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  subCatagory: number | string = 0;
  lat: number = 0;
  lng: number = 0;
  distance: number = 0;
  companies: any;
  productProject = [];
  address: any;
  addresses: any;
  categoryOptionsActive = false;
  locationInputActive = false;
  category: Category = new Category();
  categoryId: number;

  constructor(
    private winRef: WindowRef,
    private router: Router,
    private route: ActivatedRoute,
    private prdctService: ProductService,
    private authService: AuthService,
    private zipcodeService: ZipcodeService
  ) {}
  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    this.address = JSON.parse(localStorage.getItem("client_address"));
    if (!this.address) {
      this.router.navigate(["/"]);
    }
    this.route.queryParams.subscribe(
      (response) => {
        this.reachedPageEnd = false;
        this.query = response.q;
        this.categoryId = response.categoryId;
        this.loadFirstTime();
      },
      (err) => console.log(err)
    );

    this.route.data.subscribe((data: { categories: Category[] }) => {
      this.categories = data.categories;
      // console.log(data.categories);
    });
    if (!this.categoryId) {
      this.loadFirstTime();
    }
  }

  loadFirstTime() {
    this.page = 1;
    if (this.address && this.address.Latitude && this.address.Longitude) {
      this.authService.progressBarActive.next(true);
      this.prdctService
        .listCompaniesProducts(
          this.page,
          this.address.Latitude,
          this.address.Longitude,
          this.categoryId,
          this.query
        )
        .subscribe((company) => {
          this.companies = company;
          this.shouldLoad = true;
          this.authService.progressBarActive.next(false);
          this.loadJobs();
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
    window.onscroll = () => {
      if (!this.router.url.includes("/products")) {
        return;
      }
      var bottomPosition = window.innerHeight + window.pageYOffset;
      var elementPosition = this.anchor
        ? this.anchor.nativeElement.offsetTop
        : 0;

      if (
        elementPosition < bottomPosition &&
        this.shouldLoad &&
        !this.reachedPageEnd &&
        !!this.address &&
        this.address.Latitude &&
        this.address.Longitude
      ) {
        this.shouldLoad = false;
        this.authService.progressBarActive.next(true);
        this.prdctService
          .listCompaniesProducts(
            ++this.page,
            this.address.Latitude,
            this.address.Longitude,
            this.categoryId,
            this.query
          )
          .subscribe((company) => {
            let l = this.companies.length;
            this.shouldLoad = true;
            for (let i = 0; i < company.length; i++) {
              this.companies.push(company[i]);
            }
            let l2 = this.companies.length;
            if (l == l2) {
              this.reachedPageEnd = true;
            }
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
    this.getProducts();
  }
  searchByCtgry(id: number | string) {
    this.subCatagory = id;
    this.getProducts();
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
    this.reachedPageEnd = false;
    this.getProducts();
    this.onBlur();
  }

  getProducts() {
    if (this.address) {
      localStorage.setItem("client_address", JSON.stringify(this.address));
      this.authService.updateClientLocation(this.address);
      this.loadFirstTime();
      this.searchInput.setValue("");
      this.categoryOptionsActive = false;
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
      this.address.CityName ? this.address.CityName : "Your Location"
    );
    this.locationInputActive = false;
  }

  getCategoryName() {
    if (!this.categoryId) {
      return false;
    }
    let name = "";
    this.categories.map((cat) => {
      if (cat.id == this.categoryId) {
        name = cat.name;
      }
    });
    return name;
  }

  removeCategory() {
    this.categoryId = null;
    const queryParams: Params = { categoryId: null };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: "merge",
    });
  }
}
