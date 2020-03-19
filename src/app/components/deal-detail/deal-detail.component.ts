import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";

import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

import { Product } from "../../model/product";

import { DataStorageService } from "../../service/data-storage.service";

import { CartService } from "../../service/cart.service";
import { ReserveProduct } from "../../model/reserve-product";
import { Order } from "../../model/order";
import { Markup } from "../../model/markup";

import { CartExpiredDialogComponent } from "../cart-expired-dialog/cart-expired-dialog.component";

import * as moment from "moment";

@Component({
  selector: "app-deal-detail",
  templateUrl: "./deal-detail.component.html",
  styleUrls: ["./deal-detail.component.scss"]
})
export class DealDetailComponent implements OnInit {
  product: Product;
  markup: Markup;
  buyForm = this.fb.group({
    quantity: ["1", Validators.required]
  });
  total: any;
  showErrorNotification = false;
  errorMessage = "";

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private dsSerive: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: { product: Product; mspMarkup: Markup }) => {
        console.log(data)
        this.product = data.product;
        [
          "offerStartTime",
          "offerEndTime",
          "pickupStartTime",
          "pickupEndTime"
        ].map(
          key =>
            (this.product[key] = this.changeToLocal12Hours(this.product[key]))
        );
        this.markup = data.mspMarkup;
      }
    );
  }

  gotoCart() {
    this.router.navigate(["../../cart"]);
  }

  cancel() {
    this.router.navigate(["../"]);
  }

  // showResetDialog() {
  //   Promise.resolve().then(() => {
  //     const dialogRef = this.dialog.open(CartExpiredDialogComponent, {
  //       width: "250px",
  //       data: {
  //         title: "Cart Time Expired",
  //         message:
  //           "Sorry, your shopping cart time limit of ten minutes has expired"
  //       }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       this.cartService.resetCart();
  //       this.router.navigate(["../"]);
  //     });
  //   });
  // }
  // showFarFarmYouDialog() {
  //   Promise.resolve().then(() => {
  //     const dialogRef = this.dialog.open(CartExpiredDialogComponent, {
  //       width: "250px",
  //       data: { title: "", message: "Sorry, store too far from you." }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       this.router.navigate(["../"]);
  //     });
  //   });
  // }
  // showDeadlineDialog() {
  //   Promise.resolve().then(() => {
  //     const dialogRef = this.dialog.open(CartExpiredDialogComponent, {
  //       width: "250px",
  //       data: {
  //         title: "",
  //         message:
  //           "Sorry, Reservation Deadline has expired. Check back again tomorrow."
  //       }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       this.cartService.resetCart();
  //       this.router.navigate(["../"]);
  //     });
  //   });
  // }
  // showReservationNotStartedDialog() {
  //   Promise.resolve().then(() => {
  //     const dialogRef = this.dialog.open(CartExpiredDialogComponent, {
  //       width: "250px",
  //       data: { title: "", message: "Sorry, Reservation not started yet." }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       this.cartService.resetCart();
  //       this.router.navigate(["../"]);
  //     });
  //   });
  // }
  addToCart() {
    this.showErrorNotification = false;
    this.errorMessage = "";
    if (this.cartService.isCartExpired()) {
      this.cartService.resetCart();
    }
    let order: Order;
    if (
      this.product.quantity >= this.buyForm.get("quantity").value &&
      this.buyForm.get("quantity").value > 0
    ) {
      order = JSON.parse(localStorage.getItem("msp_cart_items")) || new Order();
      console.log(order);
      let reserveProduct = new ReserveProduct();
      reserveProduct.ordruid = order.guid;
      reserveProduct.prdid = this.product.id;
      reserveProduct.qty = this.buyForm.get("quantity").value;
      this.cartService.addToCart(reserveProduct).subscribe(rsrvdPrd => {
        if (rsrvdPrd["success"]) {
          reserveProduct.name = this.product.name;
          reserveProduct.imagePath = this.product.imagePath;
          reserveProduct.description = this.product.description;
          reserveProduct.unitPrice = this.product.discountPrice;
          reserveProduct.regPrice = this.product.normalPrice;
          reserveProduct.disPrice = this.product.discountPrice;
          reserveProduct.mspMarkup = this.markup.mspMarkup;
          reserveProduct.ordruid = rsrvdPrd["guid"];
          this.cartService.addToLocalCart(reserveProduct, rsrvdPrd["guid"]);
          this.router.navigate(["../../cart"]);
        } else {
          this.errorMessage = rsrvdPrd["message"];
          this.showErrorNotification = true;
        }
      });
    } else {
      this.errorMessage = "quantiy can not be less than 0 or greater than";
      this.showErrorNotification = true;
    }
  }

  gotoBuyerAdmin() {
    if (
      this.product.quantityOnHand >= this.buyForm.get("quantity").value &&
      this.buyForm.get("quantity").value > 0
    ) {
      // console.log(this.buyForm.get("quantity").value);
      this.dsSerive.selectedProductInfo = {
        productId: this.product.id,
        quantity: this.buyForm.get("quantity").value
      };
      let navigationExtras: NavigationExtras = {
        queryParams: {
          productId: this.product.id,
          quantity: this.buyForm.get("quantity").value
        }
      };
      this.router.navigate(
        ["/tlgu-byr/payment", this.product.id],
        navigationExtras
      );
    } else {
      alert(
        "quantiy can not be less than 0 or greater than " +
          this.product.quantityOnHand
      );
    }
  }
  onSubmit() {}

  changeToLocal12Hours(time) {
    let d = -new Date().getTimezoneOffset();
    let x = time.split(":");
    let hour = parseInt(x[0]);
    let minute = parseInt(x[1]);
    let totalMinutes = hour * 60 + minute + d;
    hour = Math.floor(totalMinutes / 60);
    minute = totalMinutes % 60;

    if (hour < 12) {
      return `${this.returnTwoDigit(hour)}:${this.returnTwoDigit(minute)}:00AM`;
    } else if (hour == 12) {
      return `${this.returnTwoDigit(12)}:${this.returnTwoDigit(minute)}:00PM`;
    } else if (hour > 24) {
      return `${this.returnTwoDigit(hour - 24)}:${this.returnTwoDigit(
        minute
      )}:00AM`;
    } else if (hour == 24) {
      return `${this.returnTwoDigit(12)}:${this.returnTwoDigit(minute)}:00AM`;
    } else {
      return `${this.returnTwoDigit(hour % 12)}:${this.returnTwoDigit(
        minute
      )}:00PM`;
    }
  }

  returnTwoDigit(value) {
    return value.toString().length == 1 ? "0" + value : value;
  }
}
