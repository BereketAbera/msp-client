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
  styleUrls: ["./deal-detail.component.scss"],
})
export class DealDetailComponent implements OnInit {
  product: any;
  markup: Markup;
  buyForm = this.fb.group({
    quantity: ["1", Validators.required],
  });
  total: any;
  showErrorNotification = false;
  errorMessage = "";
  current;

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private dsSerive: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.route.data.subscribe(
      (data: { product: Product; mspMarkup: Markup }) => {
        //  console.log(JSON.parse(localStorage.getItem("msp_cart_items")).products)

        let localProduct = this.cartService.getLocalCartProducts();
        if (localProduct) {
          localProduct.map((prod) => {
            if (prod.prdid == data.product.id) {
              data.product.currentQuantity = (parseInt(data.product.currentQuantity) + prod.qty)<0?0:(parseInt(data.product.currentQuantity) + prod.qty);
            }
          });
        }

        this.product = data.product;
        [
          "offerStartTime",
          "offerEndTime",
          "pickupStartTime",
          "pickupEndTime",
        ].map(
          (key) =>
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
      let reserveProduct = new ReserveProduct();
      reserveProduct.ordruid = order.guid;
      reserveProduct.prdid = this.product.id;
      reserveProduct.qty = this.buyForm.get("quantity").value;
      // console.log(this.product.currentQuantity,reserveProduct.qty,'check')
      if (reserveProduct.qty > this.product.currentQuantity) {
        this.errorMessage = "Quantity must be less than available quantity";
        this.showErrorNotification = true;
        return false;
      }
      // reserveProduct. =
      let clientAddress = JSON.parse(localStorage.getItem("client_address"));
      if (!clientAddress.Latitude || !clientAddress.Longitude) {
        this.errorMessage = "You sould specify your location first.";
        this.showErrorNotification = true;
      }
      this.cartService
        .addToCart({
          ...reserveProduct,
          lat: clientAddress.Latitude,
          lng: clientAddress.Longitude,
        })
        .subscribe((rsrvdPrd) => {
          // console.log(rsrvdPrd);
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
          } else if (rsrvdPrd["message"]) {
            this.errorMessage = rsrvdPrd["message"];
            this.showErrorNotification = true;
          } else if (rsrvdPrd["messages"]) {
            this.errorMessage = rsrvdPrd["messages"][0];
            this.showErrorNotification = true;
          }
        });
    } else {
      this.errorMessage = "quantity can not be less than 0 or greater than ";
      this.showErrorNotification = true;
    }
  }

  gotoBuyerAdmin() {
    if (
      this.product.quantityOnHand >= this.buyForm.get("quantity").value &&
      this.buyForm.get("quantity").value > 0
    ) {
      this.dsSerive.selectedProductInfo = {
        productId: this.product.id,
        quantity: this.buyForm.get("quantity").value,
      };
      let navigationExtras: NavigationExtras = {
        queryParams: {
          productId: this.product.id,
          quantity: this.buyForm.get("quantity").value,
        },
      };
      this.router.navigate(
        ["/tlgu-byr/payment", this.product.id],
        navigationExtras
      );
    } else {
      alert(
        "quantity can not be less than 0 or greater than " +
          this.product.quantityOnHand
      );
    }
  }
  onSubmit() {}

  showNotification($event) {
    this.showErrorNotification = $event;
  }

  changeToLocal12Hours(time) {
    let d = -new Date().getTimezoneOffset();
    let x = time.split(":");
    let hour = parseInt(x[0]);
    let minute = parseInt(x[1]);
    let totalMinutes = hour * 60 + minute + d;
    totalMinutes = totalMinutes < 0 ? 24 * 60 + totalMinutes : totalMinutes;
    hour = Math.floor(totalMinutes / 60);
    minute = totalMinutes % 60;

    if (hour < 12) {
      return `${this.returnTwoDigit(hour)}:${this.returnTwoDigit(minute)}AM`;
    } else if (hour == 12) {
      return `${this.returnTwoDigit(12)}:${this.returnTwoDigit(minute)}PM`;
    } else if (hour > 24) {
      return `${this.returnTwoDigit(hour - 24)}:${this.returnTwoDigit(
        minute
      )}AM`;
    } else if (hour == 24) {
      return `${this.returnTwoDigit(12)}:${this.returnTwoDigit(minute)}AM`;
    } else {
      return `${this.returnTwoDigit(hour % 12)}:${this.returnTwoDigit(
        minute
      )}PM`;
    }
  }

  returnTwoDigit(value) {
    return value.toString().length == 1 ? "0" + value : value;
  }
}
