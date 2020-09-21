import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "../../model/category";
import { AuthService } from "../../service/auth.service";
import { WindowRef } from "../../service/window.service";
import { ZipcodeService } from "./../../service/zipcode.service";
import { ConfigurationService } from "src/app/service/configuartion.service";

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
  videosC = true;
  @ViewChild("videoPlayer", { static: true }) videoplayer: ElementRef;
  @ViewChild("videoPlayerB", { static: true }) videoplayerB: ElementRef;
  play: boolean;
  play2: any;
  config: any;
  constructor(
    private winRef: WindowRef,
    private route: ActivatedRoute,
    private authService: AuthService,
    private zipcodeService: ZipcodeService,
    private router: Router,
    private configService: ConfigurationService
  ) {}
  ngOnInit() {
    // window.scrollTo(0, 0);
    this.route.data.subscribe((data: { categories: Category[] }) => {
      this.categories = data.categories;
    });
    this.config = this.configService.configData;
    // this.videoplayer.nativeElement.pause();
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
    this.videoplayer.nativeElement.load();
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
}
