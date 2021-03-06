import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/model/product";
import { ProductService } from "../../service/product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  query: string = "";
  name: string;
  address: string;
  distance: number;
  shopInfo: string;
  city: string;
  days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  constructor(
    private router: Router,
    private prdService: ProductService,
    private route: ActivatedRoute
  ) {
    //his.name = this.product.name;
  }

  ngInit() {}
  navdetail(product: Product) {
    this.router.navigate(["/deal", product.id]);
  }
  ngOnInit() {
    // console.log(this.product);
    this.route.queryParams.subscribe(
      (response) => {
        response.q ? (this.query = response.q) : "";
      },
      (err) => console.log(err)
    );
  }
  getShopInfo(prdId: number) {
    this.prdService
      .getShopInfo(prdId, 40.712776, -74.005974)
      .subscribe((rslt) => {
        this.address = rslt.address;
        this.distance = rslt.distance;
        this.shopInfo = this.address + " " + this.distance + " mi";
      });
  }
  ngAfterViewChecked() {}

  changeToLocal12Hours(time) {
    let d = -new Date().getTimezoneOffset();
    // console.log(d);
    let x = time.split(":");
    let hour = parseInt(x[0]);
    let minute = parseInt(x[1]);
    let totalMinutes = hour * 60 + minute + d;
    let tempTotalMinutes = totalMinutes;
    totalMinutes = totalMinutes < 0 ? 24 * 60 + totalMinutes : totalMinutes;
    hour = Math.floor(totalMinutes / 60);
    minute = totalMinutes % 60;

    // console.log(hour);
    let value = "";
    if (hour < 12) {
      value = `${this.returnTwoDigit(hour)}:${this.returnTwoDigit(minute)}AM`;
    } else if (hour == 12) {
      value = `${this.returnTwoDigit(12)}:${this.returnTwoDigit(minute)}PM`;
    } else if (hour > 24) {
      value = `${this.returnTwoDigit(hour - 24)}:${this.returnTwoDigit(
        minute
      )}AM`;
    } else if (hour == 24) {
      value = `${this.returnTwoDigit(12)}:${this.returnTwoDigit(minute)}AM`;
    } else {
      value = `${this.returnTwoDigit(hour % 12)}:${this.returnTwoDigit(
        minute
      )}PM`;
    }
    // let day = new Date().getDay();
    // let yest = day == 1 ? 7 : day - 1;
    // let tomm = day == 7 ? 1 : day + 1;
    // // console.log(yest, tomm);
    // if (tempTotalMinutes < 0) {
    //   value = value + `(${this.days[yest - 1]})`;
    // } else if (tempTotalMinutes > 24 * 60) {
    //   value = value + `(${this.days[tomm - 1]})`;
    // }

    return value;
  }

  returnTwoDigit(value) {
    return value.toString().length == 1 ? "0" + value : value;
  }

  checkAvailability(start, end) {
    let d = -new Date().getTimezoneOffset();
    let x = start.split(":");
    let hour = parseInt(x[0]);
    let minute = parseInt(x[1]);
    let totalMinutesS = hour * 60 + minute + d;

    let xE = end.split(":");
    let hourE = parseInt(xE[0]);
    let minuteE = parseInt(xE[1]);
    let totalMinutesE = hourE * 60 + minuteE + d;

    let localMinutes = new Date().getHours() * 60 + new Date().getMinutes();

    if (totalMinutesS < totalMinutesE) {
      if (totalMinutesS > localMinutes || totalMinutesE < localMinutes) {
        return true;
      }
    }

    return false;
  }
  // checkAvailability2(end) {
  //   let d = -new Date().getTimezoneOffset();
  //   let x = end.split(":");
  //   let hour = parseInt(x[0]);
  //   let minute = parseInt(x[1]);
  //   let totalMinutes = hour * 60 + minute + d;
  //   let localMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  //   if (localMinutes > totalMinutes) {
  //     return true;
  //   }
  //   return false;
  // }
}
