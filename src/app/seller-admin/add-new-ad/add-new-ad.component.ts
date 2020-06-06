import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "../../service/product.service";
import { AuthService } from "../../service/auth.service";
import { Product } from "src/app/model/product";
import { MatDialog } from "@angular/material";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { Shop } from "../../model/shop";
import { Category } from "../../model/category";
import { Picture } from "../../model/picture";

import * as moment from "moment";

import { SaveConfirmationDialogComponent } from "../../shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "../../shared/save-progress/save-progress.component";
import { RequestResultComponent } from "../request-result/request-result.component";

export interface Discount {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-add-new-ad",
  templateUrl: "./add-new-ad.component.html",
  styleUrls: ["./add-new-ad.component.scss"],
})
export class AddNewAdComponent implements OnInit {
  weekDaysInit = [
    { name: "MON", selected: true, id: 1 },
    { name: "TUE", selected: true, id: 2 },
    { name: "WED", selected: true, id: 3 },
    { name: "THU", selected: true, id: 4 },
    { name: "FRI", selected: true, id: 5 },
    { name: "SAT", selected: true, id: 6 },
    { name: "SUN", selected: true, id: 7 },
  ];
  markup: number = 0;
  showError: boolean = false;
  errors = [];
  offerStartInitTime = new Date(moment().valueOf());
  offerEndInitTime = new Date(moment().add(30, "m").valueOf());

  pickupStartInitTime = new Date(
    moment(this.offerStartInitTime).add(10, "m").valueOf()
  );
  pickupEndInitTime = new Date(
    moment(this.offerEndInitTime).add(40, "m").valueOf()
  );

  offerEndDate: Date;
  offerStartDate: Date;
  offerStartTime: Date;
  offerEndTime: Date;
  pickupStartTime: Date;
  pickupEndTime: Date;

  discounts: Discount[] = [
    { value: "20", viewValue: "10%" },
    { value: "20", viewValue: "15%" },
    { value: "20", viewValue: "20%" },
    { value: "25", viewValue: "25%" },
    { value: "30", viewValue: "30%" },
    { value: "35", viewValue: "35%" },
    { value: "40", viewValue: "40%" },
    { value: "45", viewValue: "45%" },
    { value: "50", viewValue: "50%" },
    { value: "55", viewValue: "55%" },
    { value: "60", viewValue: "60%" },
    { value: "65", viewValue: "65%" },
    { value: "70", viewValue: "70%" },
    { value: "75", viewValue: "75%" },
    { value: "80", viewValue: "80%" },
    { value: "85", viewValue: "85%" },
    { value: "90", viewValue: "90%" },
    { value: "95", viewValue: "95%" },
    { value: "100", viewValue: "100%" },
  ];
  options: string[];
  hhmm: string[] = [];
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
  pmam = ["PM", "AM"];
  showImage: boolean = false;
  imgPath;
  shops: Shop[];
  categories: Category[];
  pictures: Picture[];
  productForm = this.fb.group({
    name: ["", Validators.required],
    promo: ["closing", Validators.required],
    unit: ["piece", Validators.required],
    categoryId: ["", Validators.required],
    shop: ["", Validators.required],
    normalPrice: ["", Validators.required],
    discountPrice: ["10", Validators.required],
    discountPersent: ["", Validators.required],
    quantity: ["", Validators.required],
    description: [""],
    offerStartDate: ["", Validators.required],
    offerStartHH: ["", Validators.required],
    offerStartMM: ["", Validators.required],
    offerStartAMPM: ["", Validators.required],
    offerEndDate: ["", Validators.required],
    offerEndHH: ["", Validators.required],
    offerEndMM: ["", Validators.required],
    offerEndAMPM: ["", Validators.required],
    pickupStartHH: ["", Validators.required],
    pickupStartMM: ["", Validators.required],
    pickupStartAMPM: ["", Validators.required],
    pickupEndHH: ["", Validators.required],
    pickupEndMM: ["", Validators.required],
    pickupEndAMPM: ["", Validators.required],
    isOffPeak: [false],
    showNow: [false, Validators.required],
    weekDays: this.buildWeekDays(),
    imgId: null,
  });
  constructor(
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.productForm
      .get("normalPrice")
      .valueChanges.pipe(
        debounceTime(5000)
        //distinctUntilChanged()
      )
      .subscribe((inpValue) => {
        if (inpValue) {
          if (
            /^\d+$/.test(inpValue.toString()) &&
            !inpValue.toString().includes(".")
          )
            this.productForm.get("normalPrice").setValue(inpValue + ".00");
        }
      });
    for (let i = 0; i < 60; i++)
      if (i < 10) {
        let y = "0" + i.toString();
        this.hhmm.push(y);
      } else {
        this.hhmm.push(i.toString());
      }
    for (let i = 1; i < 12; i++)
      if (i < 10) {
        let y = "0" + i.toString();
        this.hhmm.push(y);
      } else {
        this.hhmm.push(i.toString());
      }

    this.route.data.subscribe(
      (data: {
        shops: Shop[];
        categories: Category[];
        markup: number;
        pictures: Picture[];
      }) => {
        this.shops = data.shops;
        this.categories = data.categories;
        this.markup = data.markup;
        this.pictures = data.pictures;
        if (this.shops.length < 1) {
          const dialogRef = this.dialog.open(RequestResultComponent, {
            width: "300px",
            height: "200px",
            data: {
              title: "",
              question: "You need at least one store to create a product",
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(["../../shops/newshp"], {
              relativeTo: this.route,
            });
          });
        }
        //console.log("shops " + data.shops.length);
      }
    );
    this.productForm.get("categoryId").valueChanges.subscribe((value) => {
      if (value == "1") {
        this.options = [
          "Sandwich",
          "Pizza",
          "Fried chicken",
          "Cheeseburger",
          "Special Drinks",
          "BBQ Meats",
          "Salad",
          "Pasta",
          "All you can eat",
        ];
      } else if (value == "2") {
        this.options = ["Massage", "Nails", "Pedicure", "Manicure", "Facial"];
      } else {
        this.options = null;
      }
      // console.log(value);
    });
    this.initOfferPickupTime();
  }
  hours12(date) {
    return (date.getHours() + 24) % 12 || 12;
  }
  buildWeekDays() {
    const arr = this.weekDaysInit.map((weekDay) => {
      return this.fb.control(weekDay.selected);
    });
    return this.fb.array(arr);
  }
  get weekDays() {
    return this.productForm.get("weekDays");
  }
  getAMPM(date) {
    return date.getHours() >= 12 ? "PM" : "AM";
  }
  initOfferPickupTime() {
    let defaultOfferSHH = this.hours12(this.offerStartInitTime).toString();
    if (defaultOfferSHH.length == 1) defaultOfferSHH = "0" + defaultOfferSHH;

    let defaultOfferSMM = this.offerStartInitTime.getMinutes().toString();
    if (defaultOfferSMM.length == 1) defaultOfferSMM = "0" + defaultOfferSMM;

    let defaultOfferSAMPM = this.getAMPM(this.offerStartInitTime);

    let defaultOfferEHH = this.hours12(this.offerEndInitTime).toString();
    if (defaultOfferEHH.length == 1) defaultOfferEHH = "0" + defaultOfferEHH;

    let defaultOfferEMM = this.offerEndInitTime.getMinutes().toString();
    if (defaultOfferEMM.length == 1) defaultOfferEMM = "0" + defaultOfferEMM;

    let defaultOfferEAMPM = this.getAMPM(this.offerEndInitTime);

    let defaultPickupSHH = this.hours12(this.pickupStartInitTime).toString();
    if (defaultPickupSHH.length == 1) defaultPickupSHH = "0" + defaultPickupSHH;

    let defaultPickupSMM = this.pickupStartInitTime.getMinutes().toString();
    if (defaultPickupSMM.length == 1) defaultPickupSMM = "0" + defaultPickupSMM;

    let defaultPickupSAMPM = this.getAMPM(this.pickupStartInitTime);

    let defaultPickupEHH = this.hours12(this.pickupEndInitTime).toString();
    if (defaultPickupEHH.length == 1) defaultPickupEHH = "0" + defaultPickupEHH;

    let defaultPickupEMM = this.pickupEndInitTime.getMinutes().toString();
    if (defaultPickupEMM.length == 1) defaultPickupEMM = "0" + defaultPickupEMM;

    let defaultPickupEAMPM = this.getAMPM(this.pickupEndInitTime);

    this.productForm.get("offerStartHH").setValue(defaultOfferSHH);
    this.productForm.get("offerStartMM").setValue(defaultOfferSMM);
    this.productForm.get("offerStartAMPM").setValue(defaultOfferSAMPM);
    this.productForm.get("offerStartDate").setValue(this.offerStartInitTime);

    this.productForm.get("offerEndHH").setValue(defaultOfferEHH);
    this.productForm.get("offerEndMM").setValue(defaultOfferEMM);
    this.productForm.get("offerEndAMPM").setValue(defaultOfferEAMPM);
    this.productForm.get("offerEndDate").setValue(this.offerEndInitTime);

    this.productForm.get("pickupStartHH").setValue(defaultPickupSHH);
    this.productForm.get("pickupStartMM").setValue(defaultPickupSMM);
    this.productForm.get("pickupStartAMPM").setValue(defaultPickupSAMPM);

    this.productForm.get("pickupEndHH").setValue(defaultPickupEHH);
    this.productForm.get("pickupEndMM").setValue(defaultPickupEMM);
    this.productForm.get("pickupEndAMPM").setValue(defaultPickupEAMPM);
  }
  onSubmit() {
    if (this.checkFormValidity()) {
      let product = new Product();
      product = { ...this.productForm.value };
      product.offerStartTime = this.offerStartTime;
      product.offerEndTime = this.offerEndTime;
      product.pickupStartTime = this.pickupStartTime;
      product.pickupEndTime = this.pickupEndTime;
      product.offerEndDate = this.offerEndDate;
      product.offerStartDate = this.offerStartDate;
      const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
        width: "300px",
        height: "200px",
        data: { title: "", question: "do you want to save this product?" },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "yes") {
          const progressDialogRef = this.dialog.open(SaveProgressComponent, {
            width: "160px",
            height: "180px",
            data: { title: "", question: "" },
          });
          this.productService.createProduct(product).subscribe(
            (res) => {
              if (res["success"]) {
                progressDialogRef.close();
                let snackBarRef = this.snackBar.open(
                  "Successfuly saved",
                  "",
                  {
                    duration: 6000,
                  }
                );
                snackBarRef.afterDismissed().subscribe(() => {
                  this.router.navigate(["../"], { relativeTo: this.route });
                });
                snackBarRef.onAction().subscribe(() => {
                  this.showImage = false;
                  this.productForm.reset();
                });
                //this.router.navigate(["../"], { relativeTo: this.route });
              } else {
                progressDialogRef.close();
                this.showError = true;
                this.errors = res["messages"];
              }
            },
            (err) => {
              progressDialogRef.close();
            }
          );
        }
      });
    } else {
      alert("Sorry, you can't submit this form now!");
    }
  }
  gotoSellAdmin() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  filePreviewHandler(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = () => {
      //var dataURL = reader.result;
      this.imgPath = reader.result;
      let file = event.target.files[0];
      // console.log(reader.result);
      this.productForm.get("img").setValue({
        filetype: file.type,
        value: reader.result,
      });
      this.showImage = true;
    };
    reader.readAsDataURL(input.files[0]);
  }
  checkDate(datestr, hhstr, mmstr) {
    if (!moment(datestr).isValid()) return false;
    if (
      moment(
        moment(datestr, "YYYY-MM-DD").date + hhstr + ":" + mmstr + ":00"
      ).isValid()
    )
      return false;
    return true;
  }
  checkFormValidity() {
    let normalPrice = this.productForm.get("normalPrice").value || 0;
    let discountPrice = this.productForm.get("discountPrice").value || 0;
    let discountPersent = this.productForm.get("discountPersent").value || 0;
    let quantity = this.productForm.get("quantity").value || 0;
    let imgId = this.productForm.get("imgId").value || 0;

    let offerStartDate = moment(
      this.productForm.get("offerStartDate").value
    ).format("YYYY-MM-DD");
    let offerStartHH = this.productForm.get("offerStartHH").value;
    let offerStartMM = this.productForm.get("offerStartMM").value;
    let offerStartAMPM = this.productForm.get("offerStartAMPM").value;

    let offerEndDate = moment(
      this.productForm.get("offerEndDate").value
    ).format("YYYY-MM-DD");
    let offerEndHH = this.productForm.get("offerEndHH").value;
    let offerEndAMPM = this.productForm.get("offerEndAMPM").value;
    let offerEndMM = this.productForm.get("offerEndMM").value;

    let pickupStartHH = this.productForm.get("pickupStartHH").value;
    let pickupStartAMPM = this.productForm.get("pickupStartAMPM").value;
    let pickupStartMM = this.productForm.get("pickupStartMM").value;

    let pickupEndHH = this.productForm.get("pickupEndHH").value;
    let pickupEndAMPM = this.productForm.get("pickupEndAMPM").value;
    let pickupEndMM = this.productForm.get("pickupEndMM").value;
    let todayMnt = moment().format("YYYY-MM-DD");
    let today = new Date(moment(todayMnt).valueOf());
    if (isNaN(imgId) || !(imgId > 0)) {
      alert("Please select image for the product.");
      return false;
    }
    if (isNaN(normalPrice) || !(normalPrice > 0)) {
      alert("Orginal Price should be valid and greater than zero.");
      return false;
    }
    if (isNaN(discountPrice) || !(discountPrice > 0)) {
      alert("Offer price should be valid and greater than zero.");
      return false;
    }
    if (
      isNaN(discountPersent) ||
      !(discountPersent >= 20 || discountPersent % 5 != 0)
    ) {
      alert("Discount By % should be valid and greater than or equal to 20%.");
      return false;
    }
    if (isNaN(quantity) || !(quantity > 0)) {
      alert("Quantity should be valid and greater than zero.");
      return false;
    }
    if (isNaN(offerStartHH)) {
      alert("Invalid pickup start hour.");
      return false;
    } else {
      if (offerStartAMPM == "PM") {
        if (offerStartHH != 12) offerStartHH = parseInt(offerStartHH) + 12;
      } else {
        if (offerStartHH == 12) offerStartHH = 0;
      }
    }
    if (isNaN(offerEndHH)) {
      alert("Invalid pickup start hour.");
      return false;
    } else {
      if (offerEndAMPM == "PM") {
        if (offerEndHH != 12) offerEndHH = parseInt(offerEndHH) + 12;
      } else {
        if (offerEndHH == 12) offerEndHH = 0;
      }
    }
    if (isNaN(pickupStartHH)) {
      alert("Invalid pickup start hour.");
      return false;
    } else {
      if (pickupStartAMPM == "PM") {
        if (pickupStartHH != 12) pickupStartHH = parseInt(pickupStartHH) + 12;
      } else {
        if (pickupStartHH == 12) pickupStartHH = 0;
      }
    }
    if (isNaN(pickupEndHH)) {
      alert("Invalid pickup start hour.");
      return false;
    } else {
      if (pickupEndAMPM == "PM") {
        if (pickupEndHH != 12) pickupEndHH = parseInt(pickupEndHH) + 12;
      } else {
        if (pickupEndHH == 12) pickupEndHH = 0;
      }
    }
    if (!this.checkDate(offerStartDate, offerStartHH, offerStartMM)) {
      alert("invalid offer start time");
      return false;
    } else if (!this.checkDate(offerEndDate, offerEndHH, offerEndMM)) {
      alert("invalid offer end time");
      return false;
    } else {
      this.offerStartTime = new Date(
        moment(
          offerStartDate + " " + offerStartHH + ":" + offerStartMM + ":00"
        ).valueOf()
      );
      this.offerEndTime = new Date(
        moment(
          offerStartDate + " " + offerEndHH + ":" + offerEndMM + ":00"
        ).valueOf()
      );
      this.pickupStartTime = new Date(
        moment(
          offerStartDate + " " + pickupStartHH + ":" + pickupStartMM + ":00"
        ).valueOf()
      );
      this.pickupEndTime = new Date(
        moment(
          offerStartDate + " " + pickupEndHH + ":" + pickupEndMM + ":00"
        ).valueOf()
      );
      this.offerEndDate = new Date(moment(offerEndDate).valueOf());
      this.offerStartDate = new Date(moment(offerStartDate).valueOf());
      this.offerStartDate.setHours(0);
      this.offerStartDate.setMinutes(0);
      this.offerStartDate.setSeconds(0);

      this.offerEndDate.setHours(23);
      this.offerEndDate.setMinutes(59);
      this.offerEndDate.setSeconds(59);

      //this.offerStartTime = new Date(this.offerStartTime.getUTCFullYear(),this.offerStartTime.getUTCMonth(),this.offerStartTime.getUTCDate(),this.offerStartTime.getUTCHours(),this.offerStartTime.getUTCMinutes(),this.offerStartTime.getUTCSeconds());
      //this.offerEndTime = new Date(this.offerEndTime.getUTCFullYear(),this.offerEndTime.getUTCMonth(),this.offerEndTime.getUTCDate(),this.offerEndTime.getUTCHours(),this.offerEndTime.getUTCMinutes(),this.offerEndTime.getUTCSeconds());
      //this.pickupStartTime = new Date(this.pickupStartTime.getUTCFullYear(),this.pickupStartTime.getUTCMonth(),this.pickupStartTime.getUTCDate(),this.pickupStartTime.getUTCHours(),this.pickupStartTime.getUTCMinutes(),this.pickupStartTime.getUTCSeconds());
      //this.pickupEndTime = new Date(this.pickupEndTime.getUTCFullYear(),this.pickupEndTime.getUTCMonth(),this.pickupEndTime.getUTCDate(),this.pickupEndTime.getUTCHours(),this.pickupEndTime.getUTCMinutes(),this.pickupEndTime.getUTCSeconds());
    }
    if (!(this.offerEndDate.getTime() >= this.offerStartDate.getTime())) {
      alert(
        "Promotion end date must be greater than or equal to promotion start date."
      );
      return false;
    }
    if (!(this.offerStartDate.getTime() >= today.getTime())) {
      alert("Promotion start date must be greater than or equal to Today.");
      return false;
    }
    if (!(this.offerEndTime.getTime() > this.offerStartTime.getTime())) {
      alert(
        "Reservation end time must be greater than reservation start time."
      );
      return false;
    }
    if (!(this.pickupEndTime.getTime() > this.pickupStartTime.getTime())) {
      alert(
        "Consumption end time must be greater than consumption start time."
      );
      return false;
    }
    if (!(this.pickupStartTime.getTime() > this.offerStartTime.getTime())) {
      alert(
        "Consumption start time must be greater than reservation start time."
      );
      return false;
    }
    if (!(this.pickupEndTime.getTime() >= this.offerEndTime.getTime())) {
      alert(
        "Consumption end time must be greater than or equal to reservation end time."
      );
      return false;
    }
    return true;
  }
  close() {
    this.showError = false;
  }
  showForm() {
    return this.authService.isAccountActive();
  }
  gotoGallery() {
    this.router.navigate(["../../gallery"], { relativeTo: this.route });
  }
}
