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
  offerStartTime: any;
  offerEndTime: any;
  validPickUpStartTime: any;
  validPickUpEndTime: any;
  resolvedDays = [0, 0];
  resolvedOfferDays = [0, 0];
  resolvedPickupDays = [0, 0];
  pickUpInput;
  startTimeUpdated = false;
  // pickUpStartChanged = false;

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
    if (takeOut && quantity && pickUpTime) {
      cnt["takeOut"].setValue(takeOut);
      cnt["quantity"].setValue(quantity);
      cnt["specialRequirements"].setValue(specialRequirements);
      this.pickUpTime = pickUpTime;
      let pickMoment = moment(pickUpTime);
      // console.log(
      //   this.pickUpTime,
      //   pickMoment.format("HH"),
      //   pickMoment.format("mm:A")
      // );
      cnt["pickupHH"].setValue(this.return12Two(pickMoment.format("HH")));
      cnt["pickupMM"].setValue(pickMoment.format("mm:A"));
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
        this.offerStartTime = data.product["offerStartTime"];
        this.offerEndTime = data.product["offerEndTime"];
        this.product = data.product;
        this.getTimeStartNEndDays(
          this.pickUpStartTime,
          this.pickUpEndTime,
          "pickup"
        );
        this.getTimeStartNEndDays(
          this.offerStartTime,
          this.offerEndTime,
          "offer"
        );
        this.product["companyPhoneNumber"] = this.phoneChangeFormat(
          this.product["companyPhoneNumber"],
          "form"
        );
        this.markup = data.mspMarkup;
      }
    );
    this.checkNAdjustStartTime();
    this.getValidStartNPickTimes();
  }

  gotoCart() {
    this.router.navigate(["../../cart"]);
  }

  cancel() {
    this.router.navigate(["../"]);
  }

  checkNAdjustStartTime() {
    let currentTime = moment();
    let endTime = moment(this.pickUpEndTime);
    let startTime = moment(this.pickUpStartTime);
    if (currentTime > startTime && currentTime < endTime) {
      this.pickUpStartTime = currentTime
        .add(30 - (currentTime.minutes() % 30), "minutes")
        .format("YYYY-MM-DD HH:mm");
      this.startTimeUpdated = true;
    }
  }

  return12Two(hour) {
    if (hour == "12") return "12";
    return this.returnTwoDigit(parseInt(hour) % 12);
  }

  adjustPickUpInput(time: moment.Moment, offset) {
    let orgTime = time.format("HH:mm");
    let date = time.format("YYYY-MM-DD");
    let newDate = time.add(offset, "minutes").format("YYYY-MM-DD");
    let newTime;
    if (date < newDate) {
      newTime = moment(
        moment().add(-1, "day").format("YYYY-MM-DD") + " " + orgTime
      ).toISOString();
    } else if (date > newDate) {
      newTime = moment(
        moment().add(1, "day").format("YYYY-MM-DD") + " " + orgTime
      ).toISOString();
    } else {
      newTime = moment(
        moment().format("YYYY-MM-DD") + " " + orgTime
      ).toISOString();
    }

    return newTime;
  }

  validatePickUpTime() {
    let fCont = this.buyForm.controls;
    let offset = this.product.utcoffset + new Date().getTimezoneOffset();
    let localPickUpInput = moment(
      moment().format("YYYY-MM-DD") +
        " " +
        fCont["pickupHH"].value +
        ":" +
        fCont["pickupMM"].value.split(":")[0] +
        ":00" +
        " " +
        fCont["pickupMM"].value.split(":")[1]
    );
    this.pickUpInput = this.adjustPickUpInput(localPickUpInput, offset);

    let sTemp = moment(this.pickUpStartTime).add(30, "minutes").toISOString();
    let eTemp = moment(this.pickUpEndTime).add(30, "minutes").toISOString();
    let valid = this.pickUpInput >= sTemp && this.pickUpInput <= eTemp;
    if (valid) {
      this.pickUpTime = this.pickUpInput;
    }
    return valid;
  }

  add30Min(time) {
    let h = parseInt(time.split(":")[0]);
    let m = parseInt(time.split(":")[1]);

    let nm = (m + 30) % 60;
    let nh = h + Math.floor((m + 30) / 60);
    return `${this.returnTwoDigit(nh)}:${this.returnTwoDigit(nm)}`;
  }

  getValidStartNPickTimes() {
    this.validPickUpStartTime = moment(this.pickUpStartTime)
      .add(30, "minutes")
      .toISOString();

    this.validPickUpEndTime = moment(this.pickUpEndTime)
      .add(30, "minutes")
      .toISOString();
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
      reserveProduct.pickUpTime = this.pickUpInput;
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

  returnTwoDigit(value) {
    return value.toString().length == 1 ? "0" + value : value;
  }

  toggleCheckbox() {
    this.buyForm.controls["takeOut"].setValue(
      !this.buyForm.controls["takeOut"].value
    );
  }

  phoneChangeFormat(value, type) {
    if (type == "db") {
      return "+1" + value.replace(/[()-\s]/g, "");
    } else {
      let v = value.replace("+1", "").replace(/[()-\s]/g, "");
      return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
    }
  }

  getTimeStartNEndDays(start, end, type) {
    let sDate = moment(start).format("YYYY-MM-DD");
    let eDate = moment(end).format("YYYY-MM-DD");
    let todayDate = moment().format("YYYY-MM-DD");
    let resolvedDays = [
      sDate > todayDate ? 1 : sDate < todayDate ? -1 : 0,
      eDate > todayDate ? 1 : eDate < todayDate ? -1 : 0,
    ];
    if (type == "offer") {
      this.resolvedOfferDays = resolvedDays;
    } else {
      this.resolvedPickupDays = resolvedDays;
    }
    return resolvedDays;
  }
}
