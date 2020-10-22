import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Category } from "@app/model/category";
import { AuthService } from "@app/service/auth.service";
import { ConfigurationService } from "@app/service/configuartion.service";
import { ProductService } from "@app/service/product.service";
import { WindowRef } from "@app/service/window.service";
import { ZipcodeService } from "@app/service/zipcode.service";

@Component({
  selector: "app-zip-products",
  templateUrl: "./zip-products.component.html",
  styleUrls: ["./zip-products.component.scss"]
})
export class ZipProductsComponent implements OnInit {
  @ViewChild("anchor", { static: true }) anchor: ElementRef<HTMLElement>;
  @ViewChild("locationInput", { static: true }) locationInput: ElementRef<HTMLElement>;
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
  firstTimeLoaded = false;
  showNoProductsMessage = false;
  config: any = {};
  radius = 160;

  constructor(
    private winRef: WindowRef,
    private router: Router,
    private route: ActivatedRoute,
    private prdctService: ProductService,
    private authService: AuthService,
    private zipcodeService: ZipcodeService,
    private configService: ConfigurationService
  ) {}
  ngOnInit() {
    this.config = this.configService.configData;
    // console.log(this.config);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.companies = [];
    this.route.queryParams.subscribe((res) => {
      let zip_code = res["zip"];
      if (!zip_code) {
        this.router.navigate(["/products"]);
      } else {
        this.radius = res["radius"] || 160;
        this.zipcodeService.searchAddress(zip_code).subscribe((res) => {
          if (res.length == 1) {
            this.addressChanged(res[0]);
          } else {
            this.router.navigate(["/products"]);
          }
        });
      }
    });

    // this.address = JSON.parse(localStorage.getItem("client_address"));
    // this.searchInput.setValue(this.address?.CityName || "Your Location");
    // if (!this.address) {
    //   this.router.navigate(["/"]);
    // }
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
    // if (!this.categoryId) {
    //   this.loadFirstTime();
    // }
  }

  checkAvailableOnThisCity() {
    if (this.address && this.address.Latitude && this.address.Longitude) {
      this.prdctService
        .listCompaniesProductszip(
          1,
          this.address.Latitude,
          this.address.Longitude,
          null,
          "",
          this.radius
        )
        .subscribe((company) => {
          if (company && company[0] && company[0].distance > this.config.localDistance) {
            this.showNoProductsMessage = true;
          } else {
            this.showNoProductsMessage = false;
          }
        });
    }
  }

  loadFirstTime() {
    this.page = 1;
    if (this.query || this.categoryId) {
      this.checkAvailableOnThisCity();
    }
    if (this.address && this.address.Latitude && this.address.Longitude) {
      this.authService.progressBarActive.next(true);
      this.prdctService
        .listCompaniesProductszip(
          this.page,
          this.address.Latitude,
          this.address.Longitude,
          this.categoryId,
          this.query,
          this.radius
        )
        .subscribe((company) => {
          if (!this.categoryId && !this.query) {
            if (company && company[0] && company[0].distance > this.config.localDistance) {
              this.showNoProductsMessage = true;
            } else {
              this.showNoProductsMessage = false;
            }
          }
          this.firstTimeLoaded = true;
          this.companies = company;
          this.shouldLoad = true;
          this.authService.progressBarActive.next(false);
          this.page = this.page + 1;
          this.loadProducts();
        });
    }
  }

  buttonClickScroll() {
    var rightPosition = window.innerHeight + window.pageYOffset;
    var elementPosition = this.anchor ? this.anchor.nativeElement.offsetTop : 0;
    var toPosition = window.innerWidth + window.pageXOffset + 1;
    window.scrollTo(elementPosition - 10, rightPosition);
  }
  loadProducts() {
    window.onscroll = () => {
      if (!this.router.url.includes("/zip_products")) {
        return;
      }
      var bottomPosition = window.innerHeight + window.pageYOffset;
      var elementPosition = this.anchor ? this.anchor.nativeElement.offsetTop : 0;
      console.log(
        elementPosition < bottomPosition &&
          this.shouldLoad &&
          !this.reachedPageEnd &&
          !!this.address &&
          this.address.Latitude &&
          this.address.Longitude
      );

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
          .listCompaniesProductszip(
            this.page,
            this.address.Latitude,
            this.address.Longitude,
            this.categoryId,
            this.query,
            this.radius
          )
          .subscribe((company) => {
            let l = this.companies.length;
            this.shouldLoad = true;
            this.companies = [...this.companies, ...company];
            let l2 = this.companies.length;
            if (l == l2) {
              this.reachedPageEnd = true;
            }
            this.authService.progressBarActive.next(false);
            this.page = this.page + 1;
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
    this.searchInput.setValue(this.address?.CityName || "Your Location");
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
              Longitude: response.coords.longitude
            })
          );
          this.address = {
            Latitude: response.coords.latitude,
            Longitude: response.coords.longitude
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
    this.searchInput.setValue(this.address?.CityName ? this.address?.CityName : "Your Location");
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
      queryParamsHandling: "merge"
    });
  }
}
