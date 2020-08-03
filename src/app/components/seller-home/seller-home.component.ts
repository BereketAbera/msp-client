import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Category } from "@app/model/category";
import { WindowRef } from "@app/service/window.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@app/service/auth.service";
import { ZipcodeService } from "@app/service/zipcode.service";
import { ConfiguartionService } from "@app/service/configuartion.service";

@Component({
  selector: "app-seller-home",
  templateUrl: "./seller-home.component.html",
  styleUrls: ["./seller-home.component.scss"],
})
export class SellerHomeComponent implements OnInit {
  @ViewChild("anchor") anchor: ElementRef<HTMLElement>;
  searchInput = new FormControl("");
  categories: Category[];
  lat: number = 0;
  lng: number = 0;
  distance: number = 0;
  addresses = [];
  address;
  videosC = true;
  @ViewChild("videoPlayer", { static: true }) videoplayer: ElementRef;
  @ViewChild("videoPlayerB", { static: true }) videoplayerB: ElementRef;
  play: boolean;
  play2: any;
  config: any;
  smallTextDisplayed = true;
  sellerTextSmall = "";
  sellerText = `You keep 100% of the sales. No fees, no deductions, no equipment to buy.
  You decide the time, date, and quantities to discount to our members. You will know ahead of time how many orders have been ordered by our members. Each member will present you with a unique discount code and pay your directly. Your regular customers will not be affected.
  Just upload your product photos, offer a discount, quantity, time and date. We will notify our members near you immediately. It is that simple.
  We only charge the buyers a small processing fee for generating discount codes and making reservations for them.`;

  constructor(
    private winRef: WindowRef,
    private route: ActivatedRoute,
    private authService: AuthService,
    private zipcodeService: ZipcodeService,
    private router: Router,
    private configService: ConfiguartionService
  ) {}
  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.data.subscribe((data: { categories: Category[] }) => {
      this.categories = data.categories;
    });
    this.config = this.configService.configData;
    this.sellerTextSmall = this.sellerText.slice(0, 230) + "...";
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
  playVideo() {
    if (this.play) {
      this.videoplayer.nativeElement.pause();
      this.play = false;
    } else {
      this.videoplayer.nativeElement.play();
      // this.videoplayer.nativeElement.requestFullscreen();
      this.play = true;
    }
  }

  playVideo2() {
    if (this.play2) {
      this.videoplayerB.nativeElement.pause();
      this.play2 = false;
    } else {
      this.videoplayerB.nativeElement.play();
      // this.videoplayer.nativeElement.requestFullscreen();
      this.play2 = true;
    }
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
    console.log("address changes");
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

  displayFullText() {
    this.smallTextDisplayed = !this.smallTextDisplayed;
    if (this.smallTextDisplayed) {
      this.sellerTextSmall = this.sellerText.slice(0, 230) + "...";
    } else {
      this.sellerTextSmall = this.sellerText;
    }
  }
}
