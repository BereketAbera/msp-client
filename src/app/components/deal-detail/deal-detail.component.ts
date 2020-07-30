import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Markup } from "../../model/markup";
import { Order } from "../../model/order";
import { Product } from "../../model/product";
import { ReserveProduct } from "../../model/reserve-product";
import { CartService } from "../../service/cart.service";
import { DataStorageService } from "../../service/data-storage.service";
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
    takeOut: [false],
    specialRequirements: [""],
    pickupHH: ["", Validators.required],
    pickupMM: ["", Validators.required],
  });
  total: any;
  showErrorNotification = false;
  errorMessage = "";
  current;
  hhmm: string[] = ["00:AM", "30:AM", "00:PM", "30:PM"];
  hhlst: string[] = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  pickUpTime: any;
  pickUpStartTime: any;
  pickUpEndTime: any;

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private dsSerive: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    let takeOut = this.route.snapshot.queryParamMap.get("takeOut");
    let quantity = this.route.snapshot.queryParamMap.get("quantity");
    let specialRequirements = this.route.snapshot.queryParamMap.get(
      "specialRequirements"
    );
    let pickUpTime = this.route.snapshot.queryParamMap.get("pickUpTime");
    let cnt = this.buyForm.controls;
    if (takeOut && quantity) {
      cnt["takeOut"].setValue(takeOut);
      cnt["quantity"].setValue(quantity);
      cnt["specialRequirements"].setValue(specialRequirements);
      this.pickUpTime = pickUpTime;
      cnt["pickupHH"].setValue(
        this.changeToLocal12Hours(pickUpTime.split("T")[1].split(".")[0]).split(
          ":"
        )[0]
      );
      let ampm = this.changeToLocal12Hours(
        pickUpTime.split("T")[1].split(".")[0]
      ).split(":")[1];
      cnt["pickupMM"].setValue(ampm.slice(0, 2) + ":" + ampm.slice(2));
    } else if (quantity) {
      cnt["quantity"].setValue(quantity);
    }

    this.route.data.subscribe(
      (data: { product: Product; mspMarkup: Markup }) => {
        let localProduct = this.cartService.getLocalCartProducts();
        if (localProduct) {
          localProduct.map((prod) => {
            if (prod.prdid == data.product.id) {
              data.product.currentQuantity =
                parseInt(data.product.currentQuantity) +
                  parseInt(prod.qty.toString()) <
                0
                  ? 0
                  : parseInt(data.product.currentQuantity) +
                    parseInt(prod.qty.toString());
            }
          });
        }
        this.pickUpStartTime = data.product["pickupStartTime"];
        this.pickUpEndTime = data.product["pickupEndTime"];

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

  validatePickUpTime() {
    let cntr = this.buyForm.controls;
    if (!(cntr["pickupHH"].valid && cntr["pickupMM"].valid)) return false;
    let offset = this.getOffset(this.product.offerStartDate);
    let fCont = this.buyForm.controls;
    this.pickUpTime = new Date(
      moment(
        new Date().toISOString().split("T")[0] +
          " " +
          fCont["pickupHH"].value +
          ":" +
          fCont["pickupMM"].value.split(":")[0] +
          ":00" +
          " " +
          fCont["pickupMM"].value.split(":")[1]
      )
        .subtract(offset, "seconds")
        .valueOf()
    ).toISOString();
    let pickUpStartTime = new Date(
      moment(
        new Date().toISOString().split("T")[0] + " " + this.pickUpStartTime
      )
        .subtract(offset, "seconds")
        .valueOf()
    ).toISOString();
    let pickUpEndTime = new Date(
      moment(new Date().toISOString().split("T")[0] + " " + this.pickUpEndTime)
        .subtract(offset, "seconds")
        .valueOf()
    ).toISOString();
    let valid =
      this.pickUpTime.split("T")[1].split(".")[0] >=
        pickUpStartTime.split("T")[1].split(".")[0] &&
      this.pickUpTime.split("T")[1].split(".")[0] <=
        pickUpEndTime.split("T")[1].split(".")[0];
    if (valid) {
      this.pickUpTime = moment(this.pickUpTime)
        .add(offset, "seconds")
        .utcOffset(offset / 60);
    }
    return valid;
  }

  getOffset(d) {
    let h = d.split("T")[1].split(":")[0];
    let m = d.split("T")[1].split(":")[1];
    let s = 0;
    if (parseInt(h) < 12) {
      s = parseInt(h) * 60 * 60 + parseInt(m) * 60;
    } else {
      s = -((24 - parseInt(h)) * 60 * 60 - parseInt(m) * 60);
    }

    return s;
  }

  addToCart() {
    this.showErrorNotification = false;
    this.errorMessage = "";
    if (this.cartService.isCartExpired()) {
      this.cartService.resetCart();
    }
    let fCont = this.buyForm.controls;
    if (fCont["takeOut"].value) {
      if (!this.validatePickUpTime()) {
        this.showErrorNotification = true;
        this.errorMessage = "Invalid pick up time";
        return;
      }
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
      reserveProduct.takeOut = this.buyForm.controls["takeOut"].value;
      reserveProduct.specialRequirements = this.buyForm.controls[
        "specialRequirements"
      ].value;
      reserveProduct.pickUpTime = this.pickUpTime;
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

  toggleCheckbox() {
    this.buyForm.controls["takeOut"].setValue(
      !this.buyForm.controls["takeOut"].value
    );
  }
}
