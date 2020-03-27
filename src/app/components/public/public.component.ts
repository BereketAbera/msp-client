import {
  group,
  animate,
  query,
  transition,
  style,
  trigger
} from "@angular/animations";
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  AfterViewChecked,
  ElementRef
} from "@angular/core";
import { Router } from "@angular/router";
import { timer } from "rxjs/observable/timer";
import * as moment from "moment";
import { AuthService } from "../../service/auth.service";

import { BannerCtrlDirective } from "../bannerCtrl/banner-ctrl.directive";

@Component({
  selector: "app-public",
  templateUrl: "./public.component.html",
  styleUrls: ["./public.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PublicComponent implements OnInit {
  isUP: boolean = false;
  source = timer(4000);
  dtNow = moment().format("YYYY-MM-DD HH:mm:ss");
  backingItems = [
    "/assets/image/bnr1.jpg?ke=" + this.dtNow,
    "/assets/image/bnr2.jpg?ke=" + this.dtNow,
    "/assets/image/bnr3.jpg?ke=" + this.dtNow
  ];
  actualIndex = 0;
  selectedIndex = 0;
  componentRef: any;
  locations = [
    { name: "2-MILES", id: 1, checked: false, distance: 2 },
    { name: "5-MILES", id: 2, checked: false, distance: 5 },
    { name: "10-MILES", id: 3, checked: false, distance: 10 },
    { name: "ALL", id: 4, distance: 0, checked: true }
  ];
  constructor(private authService: AuthService, private router: Router) {}
  name: string = "";
  mobileSearchActive = false;

  ngOnInit() {
    if (this.isLoggedIn()) this.name = this.authService.getName();
    this.getMyLocation();
  }
  getMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.authService.currentLat = position.coords.latitude;
          this.authService.currentLong = position.coords.longitude;
          this.authService.isGPSOn = true;
          console.log(
            "lat=" +
              this.authService.currentLat +
              " lng =" +
              this.authService.currentLong
          );
        },
        err => {
          this.authService.isGPSOn = false;
          // alert("Please turn on your Location and try again.");
        }
      );
    } else {
      this.authService.isGPSOn = false;
      // alert("Please turn on your Location and try again.");
    }
  }
  toggleUp() {
    this.isUP = !this.isUP;
    if (this.isUP)
      this.source.subscribe(val => {
        this.isUP = false;
      });
  }
  get items() {
    return [this.backingItems[this.actualIndex]];
  }
  gotoAdmin() {
    this.router.navigate(["./tlgu-byr"]);
  }
  onActivate(componentReference) {
    //console.log(componentReference)
    this.componentRef = componentReference;
  }
  searchByDistance(distance: number | string) {
    if (this.authService.isGPSOn) {
      this.componentRef.searchByLocation(distance);
    } else {
      alert("Please turn on your Location and try again.");
    }
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
  }

  searchClick() {
    this.mobileSearchActive = !this.mobileSearchActive;
  }
}
