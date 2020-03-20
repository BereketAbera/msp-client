import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ProductService } from "../../service/product.service";
import { AuthService } from "../../service/auth.service";
import { Product } from "src/app/model/product";
import { MatDialog } from "@angular/material";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { Shop } from "../../model/shop";
import { Category } from "../../model/category";
import { Picture } from "../../model/picture";
import _ from "lodash";
import { Location } from "@angular/common";
import * as moment from "moment";

import { SaveConfirmationDialogComponent } from "../../shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "../../shared/save-progress/save-progress.component";
import { RequestResultComponent } from "../request-result/request-result.component";
import { UploadService } from "src/app/service/upload.service";
import { ImageCroppedEvent } from "ngx-image-cropper";
import Compressor from "compressorjs";
import { stringify } from 'querystring';
// import { DragDropDirective } from 'src/app/service/drag-drop.directive';
let uploadClass = null;
export interface Discount {
  value: string;
  name: string;
}

@Component({
  selector: "app-new-off-peak-product",
  templateUrl: "./new-off-peak-product.component.html",
  styleUrls: ["./new-off-peak-product.component.scss"]
})
export class NewOffPeakProductComponent implements OnInit {
  weekDaysInit = [
    { name: "MON", selected: true, id: 1 },
    { name: "TUE", selected: true, id: 2 },
    { name: "WED", selected: true, id: 3 },
    { name: "THU", selected: true, id: 4 },
    { name: "FRI", selected: true, id: 5 },
    { name: "SAT", selected: true, id: 6 },
    { name: "SUN", selected: true, id: 7 }
  ];
  @ViewChild("file") file;
  section1 = false;
  section2 = false;
  showErrorNotification = false;
  errorMessage = "";
  markup: number = 0;
  showError: boolean = false;
  errors = [];
  offerStartInitTime = new Date(moment().valueOf());
  offerEndInitTime = new Date(
    moment()
      .add(30, "m")
      .valueOf()
  );

  fileIn;

  pickupStartInitTime = new Date(
    moment(this.offerStartInitTime)
      .add(10, "m")
      .valueOf()
  );
  pickupEndInitTime = new Date(
    moment(this.offerEndInitTime)
      .add(40, "m")
      .valueOf()
  );

  offerEndDate: Date;
  offerStartDate: Date;
  offerStartTime: Date;
  offerEndTime: Date;
  pickupStartTime: Date;
  pickupEndTime: Date;

  discounts = [
    { value: 20, name: "10%" },
    { value: 20, name: "15%" },
    { value: 20, name: "20%" },
    { value: 25, name: "25%" },
    { value: 30, name: "30%" },
    { value: 35, name: "35%" },
    { value: 40, name: "40%" },
    { value: 45, name: "45%" },
    { value: 50, name: "50%" },
    { value: 55, name: "55%" },
    { value: 60, name: "60%" },
    { value: 65, name: "65%" },
    { value: 70, name: "70%" },
    { value: 75, name: "75%" },
    { value: 80, name: "80%" },
    { value: 85, name: "85%" },
    { value: 90, name: "90%" },
    { value: 95, name: "95%" },
    { value: 100, name: "100%" }
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
    "12"
  ];
  pmam = ["PM", "AM"];
  showImage: boolean = false;
  imgPath;
  shops: Shop[];
  categories: Category[];
  pictures: Picture[];
  uploadForm = this.fb.group({
    name: ["", Validators.required],
    img: null
  });
  formData = new FormData();
  productForm = this.fb.group({
    name: ["", [Validators.required, Validators.maxLength(50)]],
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
    isOffPeak: ["offpeak", Validators.required],
    showNow: [false, Validators.required],
    weekDays: this.buildWeekDays(),
    imgId: null
  });
  files: any;
  imageUploadsDiv = false;
  element: any;
  product: any;
  categories1: any = [];
  shop1: any = [];
  clone = false;
  previousUrl: string;
  edit: boolean = false;
  imagePath: any;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  selectedImage;
  tempImg: any;
  loadingFile = false;
  loadingLocalImage = false;
  showErrorOutput: boolean;

  constructor(
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    // private dragDropDirective:DragDropDirective,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private location: Location
  ) {
    uploadClass = this;
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.productService.getProductById(params.id).subscribe(
            resp => {
              // console.log(resp);
              this.imagePath = resp.imagePath;
              this.product = resp;

              this.product["offerStartHH"] = this.changeToLocal12Hours(
                resp.offerStartTime
              ).split(";")[0];
              this.product["offerStartMM"] = this.changeToLocal12Hours(
                resp.offerStartTime
              ).split(";")[1];
              this.product["offerStartAMPM"] = this.changeToLocal12Hours(
                resp.offerStartTime
              ).split(";")[2];
              this.product["offerEndHH"] = this.changeToLocal12Hours(
                resp.offerEndTime
              ).split(";")[0];
              this.product["offerEndMM"] = this.changeToLocal12Hours(
                resp.offerEndTime
              ).split(";")[1];
              this.product["offerEndAMPM"] = this.changeToLocal12Hours(
                resp.offerEndTime
              ).split(";")[2];

              this.product["pickupStartHH"] = this.changeToLocal12Hours(
                resp.pickupStartTime
              ).split(";")[0];
              this.product["pickupStartMM"] = this.changeToLocal12Hours(
                resp.pickupStartTime
              ).split(";")[1];
              this.product["pickupStartAMPM"] = this.changeToLocal12Hours(
                resp.pickupStartTime
              ).split(";")[2];
              this.product["pickupEndHH"] = this.changeToLocal12Hours(
                resp.pickupEndTime
              ).split(";")[0];
              this.product["pickupEndMM"] = this.changeToLocal12Hours(
                resp.pickupEndTime
              ).split(";")[1];
              this.product["pickupEndAMPM"] = this.changeToLocal12Hours(
                resp.pickupEndTime
              ).split(";")[2];

              // console.log(this.product)
              // this.product.offerStartDate = this.changeToLocalDate(this.product.offerStartDate) ;
              // this.product.offerEndDate = this.changeToLocalDate(this.product.offerEndDate.split('T')[0]) ;

              this.populateFields();
              this.parseWeekDay(this.product.activeDays);
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );

    this.productForm
      .get("normalPrice")
      .valueChanges.pipe(
        debounceTime(5000)
        //distinctUntilChanged()
      )
      .subscribe(inpValue => {
        if (inpValue) {
          if (
            /^\d+$/.test(inpValue.toString()) &&
            !inpValue.toString().includes(".")
          )
            this.productForm.get("normalPrice").setValue(inpValue + ".00");
        }
      });
 
      this.hhmm.push("00:AM");
      this.hhmm.push("30:AM");
      this.hhmm.push("00:PM");
      this.hhmm.push("30:PM");

    // for (let i = 1; i < 12; i++)
    //   if (i < 10) {
    //     let y = "0" + i.toString();
    //     this.hhmm.push(y);
    //   } else {
    //     this.hhmm.push(i.toString());
    //   }

    this.route.data.subscribe(
      (data: {
        shops: Shop[];
        categories: Category[];
        markup: number;
        pictures: Picture[];
        clone: boolean;
        edit: boolean;
      }) => {
        this.clone = data.clone;
        this.edit = data.edit;
        this.shops = data.shops;
        this.categories = data.categories;
        this.markup = data.markup;
        this.pictures = data.pictures;
        this.fillShops(data.shops);
        this.fillcategories(data.categories);
        // console.log(this.shop1,this.categories1,this.discounts)
        if (this.shops.length < 1) {
          const dialogRef = this.dialog.open(RequestResultComponent, {
            width: "300px",
            height: "200px",
            data: {
              title: "",
              question: "You need at least one store to create a product"
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(["../../shops/newshp"], {
              relativeTo: this.route
            });
          });
        }
        //console.log("shops " + data.shops.length);
      }
    );
    // console.log(this.clone)
    this.productForm.get("categoryId").valueChanges.subscribe(value => {
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
          "All you can eat"
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
    const arr = this.weekDaysInit.map(weekDay => {
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

    let defaultOfferSMM = "00:AM";
    if (defaultOfferSMM.length == 1) defaultOfferSMM = "0" + defaultOfferSMM;

    let defaultOfferSAMPM = this.getAMPM(this.offerStartInitTime);

    let defaultOfferEHH = this.hours12(this.offerEndInitTime).toString();
    if (defaultOfferEHH.length == 1) defaultOfferEHH = "0" + defaultOfferEHH;

    let defaultOfferEMM = "00:AM"
    if (defaultOfferEMM.length == 1) defaultOfferEMM = "0" + defaultOfferEMM;

    let defaultOfferEAMPM = this.getAMPM(this.offerEndInitTime);

    let defaultPickupSHH = this.hours12(this.pickupStartInitTime).toString();
    if (defaultPickupSHH.length == 1) defaultPickupSHH = "0" + defaultPickupSHH;

    // let defaultPickupSMM = this.pickupStartInitTime.getMinutes().toString();
    let defaultPickupSMM = "00:AM"
    if (defaultPickupSMM.length == 1) defaultPickupSMM = "0" + defaultPickupSMM;

    let defaultPickupSAMPM = this.getAMPM(this.pickupStartInitTime);

    let defaultPickupEHH = this.hours12(this.pickupEndInitTime).toString();
    if (defaultPickupEHH.length == 1) defaultPickupEHH = "0" + defaultPickupEHH;

    let defaultPickupEMM = "00:AM"
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
  showNotification($event) {
    this.showErrorNotification = $event;
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
      product.shop = this.productForm.get("shop").value;
      if (this.productForm.get('isOffPeak').value == "offpeak") {
        product.isOffPeak = true;
      } else {
        product.isOffPeak = false;
      }
      //  console.log(product,'sdfgf')
      if (this.product && !this.clone) {
        // console.log({ ...this.productForm.value }, 'edit')
        // product = { ...this.productForm.value };
        product.id = this.product.id;
        const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
          width: "300px",
          height: "200px",
          data: { title: "", question: "do you want to Edit this product?" }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes") {
            const progressDialogRef = this.dialog.open(SaveProgressComponent, {
              width: "160px",
              height: "180px",
              data: { title: "", question: "" }
            });
            this.productService.editProduct(product).subscribe(
              res => {
                // console.log(res, 'resp')
                if (res["success"]) {
                  progressDialogRef.close();
                  let snackBarRef = this.snackBar.open(
                    "Successfuly saved",
                    "Add More",
                    {
                      duration: 2000
                    }
                  );
                  snackBarRef.afterDismissed().subscribe(() => {
                    this.location.back();
                    // this.router.navigate(["../"], { relativeTo: this.route });
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
              err => {
                progressDialogRef.close();
              }
            );
          }
        });
      } else {
        // console.log(product,'create')
        const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
          width: "300px",
          height: "200px",
          data: { title: "", question: "do you want to save this product?" }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes") {
            const progressDialogRef = this.dialog.open(SaveProgressComponent, {
              width: "160px",
              height: "180px",
              data: { title: "", question: "" }
            });
            this.productService.createProduct(product).subscribe(
              res => {
                if (res["success"]) {
                  progressDialogRef.close();
                  let snackBarRef = this.snackBar.open(
                    "Successfuly saved",
                    "Add More",
                    {
                      duration: 2000
                    }
                  );
                  snackBarRef.afterDismissed().subscribe(() => {
                    this.location.back();
                    // this.router.navigate(["../"], { relativeTo: this.route });
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
              err => {
                progressDialogRef.close();
              }
            );
          }
        });
      }
    } else {
      this.showErrorNotification = true;
      if (this.errorMessage == "") {
        this.errorMessage = "Invalid form, try again";
      }
      return false;
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
      this.productForm.get("img").setValue({
        filetype: file.type,
        value: reader.result
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
    let offerStartMM = this.productForm.get("offerStartMM").value.split(":")[0];
    let offerStartAMPM = this.productForm.get("offerStartMM").value.split(":")[1];

    
    let offerEndDate = moment(
      this.productForm.get("offerEndDate").value
    ).format("YYYY-MM-DD");
    let offerEndHH = this.productForm.get("offerEndHH").value;
    let offerEndAMPM = this.productForm.get("offerEndMM").value.split(":")[1];;
    let offerEndMM = this.productForm.get("offerEndMM").value.split(":")[0];;

    let pickupStartHH = this.productForm.get("pickupStartHH").value;
    let pickupStartAMPM = this.productForm.get("pickupStartMM").value.split(":")[1];
    let pickupStartMM = this.productForm.get("pickupStartMM").value.split(":")[0];

    let pickupEndHH = this.productForm.get("pickupEndHH").value;
    let pickupEndAMPM = this.productForm.get("pickupEndMM").value.split(":")[1];
    let pickupEndMM = this.productForm.get("pickupEndMM").value.split(":")[0];
    let todayMnt = moment().format("YYYY-MM-DD");
    let today = new Date(moment(todayMnt).valueOf());
    if (isNaN(imgId) || !(imgId > 0)) {
      // alert("");
      this.errorMessage = "Please select image for the product.";
      return false;
    }
    if (isNaN(normalPrice) || !(normalPrice > 0)) {
      this.errorMessage =
        "Orginal Price should be valid and greater than zero.";
      return false;
    }
    if (isNaN(discountPrice) || !(discountPrice > 0)) {
      this.errorMessage = "Offer price should be valid and greater than zero.";
      return false;
    }
    if (
      isNaN(discountPersent) ||
      !(discountPersent >= 20 || discountPersent % 5 != 0)
    ) {
      this.errorMessage =
        "Discount By % should be valid and greater than or equal to 20%.";
      return false;
    }
    if (isNaN(quantity) || !(quantity > 0)) {
      this.errorMessage = "Quantity should be valid and greater than zero.";
      return false;
    }
    if (isNaN(offerStartHH)) {
      this.errorMessage = "Invalid pickup start hour.";
      return false;
    } else {
      if (offerStartAMPM == "PM") {
        if (offerStartHH != 12) offerStartHH = parseInt(offerStartHH) + 12;
      } else {
        if (offerStartHH == 12) offerStartHH = 0;
      }
    }
    if (isNaN(offerEndHH)) {
      this.errorMessage = "Invalid pickup start hour.";
      return false;
    } else {
      if (offerEndAMPM == "PM") {
        if (offerEndHH != 12) offerEndHH = parseInt(offerEndHH) + 12;
      } else {
        if (offerEndHH == 12) offerEndHH = 0;
      }
    }
    if (isNaN(pickupStartHH)) {
      this.errorMessage = "Invalid pickup start hour.";
      return false;
    } else {
      if (pickupStartAMPM == "PM") {
        if (pickupStartHH != 12) pickupStartHH = parseInt(pickupStartHH) + 12;
      } else {
        if (pickupStartHH == 12) pickupStartHH = 0;
      }
    }
    if (isNaN(pickupEndHH)) {
      this.errorMessage = "Invalid pickup start hour.";
      return false;
    } else {
      if (pickupEndAMPM == "PM") {
        if (pickupEndHH != 12) pickupEndHH = parseInt(pickupEndHH) + 12;
      } else {
        if (pickupEndHH == 12) pickupEndHH = 0;
      }
    }
    if (!this.checkDate(offerStartDate, offerStartHH, offerStartMM)) {
      this.errorMessage = "invalid offer start time";
      return false;
    } else if (!this.checkDate(offerEndDate, offerEndHH, offerEndMM)) {
      this.errorMessage = "invalid offer end time";
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

      this.offerEndDate = new Date(
        moment(offerEndDate)
          .add("hours", 13)
          .valueOf()
      );
      this.offerStartDate = new Date(
        moment(offerStartDate)
          .add("hours", 13)
          .valueOf()
      );

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
      this.errorMessage =
        "Promotion end date must be greater than or equal to promotion start date.";

      return false;
    }
    // if (!(this.offerStartDate.getTime() >= today.getTime())) {
    //   alert("Promotion start date must be greater than or equal to Today.");
    //   return false;
    // }
    if (!(this.offerEndTime.getTime() > this.offerStartTime.getTime())) {
      // this.showErrorNotification=true;
      this.errorMessage =
        "Reservation end time must be greater than reservation start time.";
      return false;
    }
    if (!(this.pickupEndTime.getTime() > this.pickupStartTime.getTime())) {
      this.errorMessage =
        "Consumption end time must be greater than consumption start time.";
      return false;
    }
    if (!(this.pickupStartTime.getTime() > this.offerStartTime.getTime())) {
      this.errorMessage =
        "Consumption start time must be greater than reservation start time.";
      return false;
    }
    if (!(this.pickupEndTime.getTime() >= this.offerEndTime.getTime())) {
      this.errorMessage =
        "Consumption end time must be greater than or equal to reservation end time.";
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
  toggleImageUploads() {
    this.imageUploadsDiv = !this.imageUploadsDiv;
  }
  toggleNext(index) {
    if (index == 1) {
      this.section1 = true;
    } else if (index == 2) {
      this.section2 = true;
    }
  }

  reserveTimesOnChanges($event) {
    let curr = this.productForm.get('offerStartHH').value;
    let currY = this.productForm.get('offerEndHH').value;
    let pick = this.productForm.get('pickupStartHH').value;
    let pickY = this.productForm.get('pickupEndHH').value;
    if (parseInt(curr) == 12 && parseInt(curr) > parseInt(currY)) {
      this.productForm.get('offerEndHH').setValue(`${this.returnTwoDigit(parseInt(curr))}`);  
    } else if(parseInt(curr) > parseInt(currY)) {
      this.productForm.get('offerEndHH').setValue(`${this.returnTwoDigit(parseInt(curr) + 1)}`);
    }else if(parseInt(curr) > parseInt(pick) ){
      this.productForm.get('pickupStartHH').setValue(`${this.returnTwoDigit(parseInt(curr) +1 )}`);  
    }
  }
  consumptionTimesOnChanges($event) {
    let curr = this.productForm.get('pickupStartHH').value;
    let currY = this.productForm.get('pickupEndHH').value;
    if (parseInt(curr) == 12 && parseInt(curr) > parseInt(currY)) {
      this.productForm.get('pickupEndHH').setValue(`${this.returnTwoDigit(parseInt(curr))}`);  
    } else if(parseInt(curr) > parseInt(currY)) {
      this.productForm.get('pickupEndHH').setValue(`${this.returnTwoDigit(parseInt(curr) + 1)}`);
    }
  }
  parseWeekDay(weekDays) {
    this.weekDaysInit.map((day, index) => {
      // day.selected = false;
      if (weekDays.includes(day.name.toLowerCase())) {
        day.selected = true;
        this.productForm
          .get("weekDays")
          .get(`${index}`)
          .setValue(true);
      } else {
        day.selected = false;
        this.productForm
          .get("weekDays")
          .get(`${index}`)
          .setValue(false);
      }
    });
  }
  populateFields() {
    _.map(this.product, (value, key) => {
      this.productForm.controls[key]
        ? this.productForm.controls[key].setValue(value)
        : null;
    });
    this.productForm.get("categoryId").setValue(this.product.subCategoryId);
    this.productForm.get("shop").setValue(this.product.storeId);
    this.productForm.get("imgId").setValue(this.product.imgId);
    this.offerStartInitTime = this.product.offerStartDate;
    this.offerEndInitTime = this.product.offerEndDate;
    this.productForm
      .get("discountPersent")
      .setValue(this.product.discountPercentage);
    if (this.product.isOffPeak) {
      this.productForm.get('isOffPeak').setValue('offpeak')
    } else {
      this.productForm.get('isOffPeak').setValue('endof')
    }

  }

  fillcategories(categories) {
    categories.map(industry => {
      this.categories1.push({
        name: industry.name,
        value: industry.id
      });
    });
  }

  fillShops(shop) {
    shop.map(shop => {
      this.shop1.push({
        name: shop.name,
        value: shop.id
      });
    });
  }

  returnTwoDigit(value) {
    return value.toString().length == 1 ? "0" + value : value;
  }
  changeToLocal12Hours(time) {
    let d = -new Date().getTimezoneOffset();
    let x = time.split(":");
    let hour = parseInt(x[0]);
    let minute = parseInt(x[1]);
    let totalMinutes = hour * 60 + minute;
    hour = Math.floor(totalMinutes / 60);
    minute = totalMinutes % 60;

    if (hour < 12) {
      return `${this.returnTwoDigit(hour)};${this.returnTwoDigit(minute)}:AM;AM`;
    } else if (hour == 12) {
      return `${this.returnTwoDigit(12)};${this.returnTwoDigit(minute)}:PM;PM`;
    } else if (hour > 24) {
      return `${this.returnTwoDigit(hour - 24)};${this.returnTwoDigit(
        minute
      )}:AM;AM`;
    } else if (hour == 24) {
      return `${this.returnTwoDigit(12)};${this.returnTwoDigit(minute)}:AM;AM`;
    } else {
      return `${this.returnTwoDigit(hour % 12)};${this.returnTwoDigit(
        minute
      )}:PM;PM`;
    }
  }

  fileChangeDragEvent(event: any) {
    if (!event[0]) {
      return;
    }
    let name = event[0].name;
    if (name) {
      if (
        ["PNG", "JPG", "JPEG"].includes(
          name.split(".")[name.split(".").length - 1].toUpperCase()
        )
      ) {
        this.loadingLocalImage = true;
        this.imageChangedEvent = event[0];
        this.files = event[0].name;
        this.element = event[0];
      } else {
        this.loadingLocalImage = false;
        this.snackBar.open("The file type should be PNG or JPEG", "", {
          duration: 4000
        });
      }
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.loadingLocalImage = false;
    if (event.width < 550 || event.height < 440) {
      let snackBarRef = this.snackBar.open(
        "Image is not large enough, Select a larger image.",
        "",
        {
          duration: 4000
        }
      );
      this.imageChangedEvent = "";
      return;
    }
    this.croppedImage = event;
  }

  closeModal() {
    uploadClass.imageChangedEvent = "";
  }

  saveImage() {
    this.tempImg = this.croppedImage.base64;
    let byteCharacters = atob(this.tempImg.split(",")[1]);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], { type: "image/jpeg" });

    this.compressImage(blob);
  }

  compressImage(image) {
    let setLocal = this.setLocalImage;
    let closeModal = this.closeModal;
    new Compressor(image, {
      quality: 0.7,
      minWidth: 550,
      maxWidth: 550,
      mimeType: "JPEG",
      success(result) {
        // setLocal(result);
        uploadClass.uploadForm.get("img").setValue(result);
        uploadClass.uploadForm.get("name").setValue(Date.now());
        if (uploadClass.uploadForm.value) {
          // this.formData.append("name", this.uploadForm.get("name").value);
          let value = uploadClass.uploadForm.value;
          uploadClass.formData.append("name", value["name"]);
          uploadClass.formData.append("img", value["img"]);
          uploadClass.uploadService.createImage(uploadClass.formData).subscribe(
            res => {
              if (res["success"]) {
                //progressDialog.close();
                let snackBarRef = uploadClass.snackBar.open(
                  "Successfuly Uploaded File",
                  "Upload More",
                  {
                    duration: 2000
                  }
                );
                uploadClass.pictures.unshift(res["image"]);
                uploadClass.productForm.get("imgId").setValue(res["image"].id);
              } else {
                this.showError = true;
                this.errors = res["messages"];
              }
            },
            err => {
              console.log(err);
            }
          );
        }
        closeModal();
      },
      error(err) {
        console.log(err);
      }
    });
  }

  setLocalImage(blob) {
    var urlCreator = window.URL;
    var imageUrl = urlCreator.createObjectURL(blob);
    document.querySelector("#localImage")["src"] = imageUrl;
  }
}
