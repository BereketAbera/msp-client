import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { AuthService } from '../../service/auth.service';
import { Product } from 'src/app/model/product';
import { MatDialog } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { SaveConfirmationDialogComponent } from '../../shared/save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveProgressComponent } from '../../shared/save-progress/save-progress.component';
import { RequestResultComponent } from '../request-result/request-result.component';
var NewOffPeakProductComponent = /** @class */ (function () {
    function NewOffPeakProductComponent(authService, snackBar, dialog, route, router, productService, fb) {
        this.authService = authService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        this.productService = productService;
        this.fb = fb;
        this.weekDaysInit = [
            { name: 'MON', selected: true, id: 1 },
            { name: 'TUE', selected: true, id: 2 },
            { name: 'WED', selected: true, id: 3 },
            { name: 'THU', selected: true, id: 4 },
            { name: 'FRI', selected: true, id: 5 },
            { name: 'SAT', selected: true, id: 6 },
            { name: 'SUN', selected: true, id: 7 },
        ];
        this.markup = 0;
        this.showError = false;
        this.errors = [];
        this.offerStartInitTime = new Date(moment().valueOf());
        this.offerEndInitTime = new Date(moment().add(30, 'm').valueOf());
        this.pickupStartInitTime = new Date(moment(this.offerStartInitTime).add(10, 'm').valueOf());
        this.pickupEndInitTime = new Date(moment(this.offerEndInitTime).add(40, 'm').valueOf());
        this.discounts = [
            { value: '20', viewValue: '10%' },
            { value: '20', viewValue: '15%' },
            { value: '20', viewValue: '20%' },
            { value: '25', viewValue: '25%' },
            { value: '30', viewValue: '30%' },
            { value: '35', viewValue: '35%' },
            { value: '40', viewValue: '40%' },
            { value: '45', viewValue: '45%' },
            { value: '50', viewValue: '50%' },
            { value: '55', viewValue: '55%' },
            { value: '60', viewValue: '60%' },
            { value: '65', viewValue: '65%' },
            { value: '70', viewValue: '70%' },
            { value: '75', viewValue: '75%' },
            { value: '80', viewValue: '80%' },
            { value: '85', viewValue: '85%' },
            { value: '90', viewValue: '90%' },
            { value: '95', viewValue: '95%' },
            { value: '100', viewValue: '100%' },
        ];
        this.hhmm = [];
        this.hhlst = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        this.pmam = ["PM", "AM"];
        this.showImage = false;
        this.productForm = this.fb.group({
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
            isOffPeak: [true],
            showNow: [false, Validators.required],
            weekDays: this.buildWeekDays(),
            imgId: null,
        });
    }
    NewOffPeakProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productForm.get('normalPrice').valueChanges.pipe(debounceTime(5000)
        //distinctUntilChanged()
        )
            .subscribe(function (inpValue) {
            if (inpValue) {
                if (/^\d+$/.test(inpValue.toString()) && !inpValue.toString().includes('.'))
                    _this.productForm.get('normalPrice').setValue(inpValue + ".00");
            }
        });
        for (var i = 0; i < 60; i++)
            if (i < 10) {
                var y = "0" + i.toString();
                this.hhmm.push(y);
            }
            else {
                this.hhmm.push(i.toString());
            }
        for (var i = 1; i < 12; i++)
            if (i < 10) {
                var y = "0" + i.toString();
                this.hhmm.push(y);
            }
            else {
                this.hhmm.push(i.toString());
            }
        this.route.data
            .subscribe(function (data) {
            _this.shops = data.shops;
            _this.categories = data.categories;
            _this.markup = data.markup;
            _this.pictures = data.pictures;
            if (_this.shops.length < 1) {
                var dialogRef = _this.dialog.open(RequestResultComponent, {
                    width: '300px',
                    height: '200px',
                    data: { title: "", question: "You need at least one store to create a product" }
                });
                dialogRef.afterClosed().subscribe(function (result) {
                    _this.router.navigate(["../../shops/newshp"], { relativeTo: _this.route });
                });
            }
            //console.log("shops " + data.shops.length);
        });
        this.productForm.get('categoryId').valueChanges.subscribe(function (value) {
            if (value == "1") {
                _this.options = ["Sandwich", "Pizza", "Fried chicken", "Cheeseburger", "Special Drinks", "BBQ Meats", "Salad", "Pasta", "All you can eat"];
            }
            else if (value == "2") {
                _this.options = ["Massage", "Nails", "Pedicure", "Manicure", "Facial"];
            }
            else {
                _this.options = null;
            }
            console.log(value);
        });
        this.initOfferPickupTime();
    };
    NewOffPeakProductComponent.prototype.hours12 = function (date) {
        return (date.getHours() + 24) % 12 || 12;
    };
    NewOffPeakProductComponent.prototype.buildWeekDays = function () {
        var _this = this;
        var arr = this.weekDaysInit.map(function (weekDay) {
            return _this.fb.control(weekDay.selected);
        });
        return this.fb.array(arr);
    };
    Object.defineProperty(NewOffPeakProductComponent.prototype, "weekDays", {
        get: function () {
            return this.productForm.get('weekDays');
        },
        enumerable: true,
        configurable: true
    });
    NewOffPeakProductComponent.prototype.getAMPM = function (date) {
        return date.getHours() >= 12 ? "PM" : "AM";
    };
    NewOffPeakProductComponent.prototype.initOfferPickupTime = function () {
        var defaultOfferSHH = this.hours12(this.offerStartInitTime).toString();
        if (defaultOfferSHH.length == 1)
            defaultOfferSHH = "0" + defaultOfferSHH;
        var defaultOfferSMM = this.offerStartInitTime.getMinutes().toString();
        if (defaultOfferSMM.length == 1)
            defaultOfferSMM = "0" + defaultOfferSMM;
        var defaultOfferSAMPM = this.getAMPM(this.offerStartInitTime);
        var defaultOfferEHH = this.hours12(this.offerEndInitTime).toString();
        if (defaultOfferEHH.length == 1)
            defaultOfferEHH = "0" + defaultOfferEHH;
        var defaultOfferEMM = this.offerEndInitTime.getMinutes().toString();
        if (defaultOfferEMM.length == 1)
            defaultOfferEMM = "0" + defaultOfferEMM;
        var defaultOfferEAMPM = this.getAMPM(this.offerEndInitTime);
        var defaultPickupSHH = this.hours12(this.pickupStartInitTime).toString();
        if (defaultPickupSHH.length == 1)
            defaultPickupSHH = "0" + defaultPickupSHH;
        var defaultPickupSMM = this.pickupStartInitTime.getMinutes().toString();
        if (defaultPickupSMM.length == 1)
            defaultPickupSMM = "0" + defaultPickupSMM;
        var defaultPickupSAMPM = this.getAMPM(this.pickupStartInitTime);
        var defaultPickupEHH = this.hours12(this.pickupEndInitTime).toString();
        if (defaultPickupEHH.length == 1)
            defaultPickupEHH = "0" + defaultPickupEHH;
        var defaultPickupEMM = this.pickupEndInitTime.getMinutes().toString();
        if (defaultPickupEMM.length == 1)
            defaultPickupEMM = "0" + defaultPickupEMM;
        var defaultPickupEAMPM = this.getAMPM(this.pickupEndInitTime);
        this.productForm.get('offerStartHH').setValue(defaultOfferSHH);
        this.productForm.get('offerStartMM').setValue(defaultOfferSMM);
        this.productForm.get('offerStartAMPM').setValue(defaultOfferSAMPM);
        this.productForm.get('offerStartDate').setValue(this.offerStartInitTime);
        this.productForm.get('offerEndHH').setValue(defaultOfferEHH);
        this.productForm.get('offerEndMM').setValue(defaultOfferEMM);
        this.productForm.get('offerEndAMPM').setValue(defaultOfferEAMPM);
        this.productForm.get('offerEndDate').setValue(this.offerEndInitTime);
        this.productForm.get('pickupStartHH').setValue(defaultPickupSHH);
        this.productForm.get('pickupStartMM').setValue(defaultPickupSMM);
        this.productForm.get('pickupStartAMPM').setValue(defaultPickupSAMPM);
        this.productForm.get('pickupEndHH').setValue(defaultPickupEHH);
        this.productForm.get('pickupEndMM').setValue(defaultPickupEMM);
        this.productForm.get('pickupEndAMPM').setValue(defaultPickupEAMPM);
    };
    NewOffPeakProductComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.checkFormValidity()) {
            var product_1 = new Product();
            product_1 = tslib_1.__assign({}, this.productForm.value);
            product_1.offerStartTime = this.offerStartTime;
            product_1.offerEndTime = this.offerEndTime;
            product_1.pickupStartTime = this.pickupStartTime;
            product_1.pickupEndTime = this.pickupEndTime;
            product_1.offerEndDate = this.offerEndDate;
            product_1.offerStartDate = this.offerStartDate;
            var dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
                width: '300px',
                height: '200px',
                data: { title: "", question: "do you want to save this product?" }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result == "yes") {
                    var progressDialogRef_1 = _this.dialog.open(SaveProgressComponent, {
                        width: '160px',
                        height: '180px',
                        data: { title: "", question: "" }
                    });
                    _this.productService.createProduct(product_1).subscribe(function (res) {
                        if (res['success']) {
                            progressDialogRef_1.close();
                            var snackBarRef = _this.snackBar.open("Successfuly saved", "Add More", {
                                duration: 2000,
                            });
                            snackBarRef.afterDismissed().subscribe(function () {
                                _this.router.navigate(["../"], { relativeTo: _this.route });
                            });
                            snackBarRef.onAction().subscribe(function () {
                                _this.showImage = false;
                                _this.productForm.reset();
                            });
                            //this.router.navigate(["../"], { relativeTo: this.route });
                        }
                        else {
                            progressDialogRef_1.close();
                            _this.showError = true;
                            _this.errors = res['messages'];
                        }
                    }, function (err) {
                        progressDialogRef_1.close();
                    });
                }
            });
        }
        else {
            alert("Sorry, you can't submit this form now!");
        }
    };
    NewOffPeakProductComponent.prototype.gotoSellAdmin = function () {
        this.router.navigate(["../"], { relativeTo: this.route });
    };
    NewOffPeakProductComponent.prototype.filePreviewHandler = function (event) {
        var _this = this;
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            //var dataURL = reader.result;
            _this.imgPath = reader.result;
            var file = event.target.files[0];
            console.log(reader.result);
            _this.productForm.get('img').setValue({
                filetype: file.type,
                value: reader.result
            });
            _this.showImage = true;
        };
        reader.readAsDataURL(input.files[0]);
    };
    NewOffPeakProductComponent.prototype.checkDate = function (datestr, hhstr, mmstr) {
        if (!moment(datestr).isValid())
            return false;
        if (moment(moment(datestr, "YYYY-MM-DD").date + hhstr + ":" + mmstr + ":00").isValid())
            return false;
        return true;
    };
    NewOffPeakProductComponent.prototype.checkFormValidity = function () {
        var normalPrice = this.productForm.get('normalPrice').value || 0;
        var discountPrice = this.productForm.get('discountPrice').value || 0;
        var discountPersent = this.productForm.get('discountPersent').value || 0;
        var quantity = this.productForm.get('quantity').value || 0;
        var imgId = this.productForm.get('imgId').value || 0;
        var offerStartDate = moment(this.productForm.get('offerStartDate').value).format("YYYY-MM-DD");
        var offerStartHH = this.productForm.get('offerStartHH').value;
        var offerStartMM = this.productForm.get('offerStartMM').value;
        var offerStartAMPM = this.productForm.get('offerStartAMPM').value;
        var offerEndDate = moment(this.productForm.get('offerEndDate').value).format("YYYY-MM-DD");
        ;
        var offerEndHH = this.productForm.get('offerEndHH').value;
        var offerEndAMPM = this.productForm.get('offerEndAMPM').value;
        var offerEndMM = this.productForm.get('offerEndMM').value;
        var pickupStartHH = this.productForm.get('pickupStartHH').value;
        var pickupStartAMPM = this.productForm.get('pickupStartAMPM').value;
        var pickupStartMM = this.productForm.get('pickupStartMM').value;
        var pickupEndHH = this.productForm.get('pickupEndHH').value;
        var pickupEndAMPM = this.productForm.get('pickupEndAMPM').value;
        var pickupEndMM = this.productForm.get('pickupEndMM').value;
        var todayMnt = moment().format("YYYY-MM-DD");
        var today = new Date(moment(todayMnt).valueOf());
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
        if (isNaN(discountPersent) || !(discountPersent >= 20 || discountPersent % 5 != 0)) {
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
        }
        else {
            if (offerStartAMPM == "PM") {
                if (offerStartHH != 12)
                    offerStartHH = parseInt(offerStartHH) + 12;
            }
            else {
                if (offerStartHH == 12)
                    offerStartHH = 0;
            }
        }
        if (isNaN(offerEndHH)) {
            alert("Invalid pickup start hour.");
            return false;
        }
        else {
            if (offerEndAMPM == "PM") {
                if (offerEndHH != 12)
                    offerEndHH = parseInt(offerEndHH) + 12;
            }
            else {
                if (offerEndHH == 12)
                    offerEndHH = 0;
            }
        }
        if (isNaN(pickupStartHH)) {
            alert("Invalid pickup start hour.");
            return false;
        }
        else {
            if (pickupStartAMPM == "PM") {
                if (pickupStartHH != 12)
                    pickupStartHH = parseInt(pickupStartHH) + 12;
            }
            else {
                if (pickupStartHH == 12)
                    pickupStartHH = 0;
            }
        }
        if (isNaN(pickupEndHH)) {
            alert("Invalid pickup start hour.");
            return false;
        }
        else {
            if (pickupEndAMPM == "PM") {
                if (pickupEndHH != 12)
                    pickupEndHH = parseInt(pickupEndHH) + 12;
            }
            else {
                if (pickupEndHH == 12)
                    pickupEndHH = 0;
            }
        }
        if (!this.checkDate(offerStartDate, offerStartHH, offerStartMM)) {
            alert("invalid offer start time");
            return false;
        }
        else if (!this.checkDate(offerEndDate, offerEndHH, offerEndMM)) {
            alert("invalid offer end time");
            return false;
        }
        else {
            this.offerStartTime = new Date(moment(offerStartDate + " " + offerStartHH + ":" + offerStartMM + ":00").valueOf());
            this.offerEndTime = new Date(moment(offerStartDate + " " + offerEndHH + ":" + offerEndMM + ":00").valueOf());
            this.pickupStartTime = new Date(moment(offerStartDate + " " + pickupStartHH + ":" + pickupStartMM + ":00").valueOf());
            this.pickupEndTime = new Date(moment(offerStartDate + " " + pickupEndHH + ":" + pickupEndMM + ":00").valueOf());
            this.offerEndDate = (new Date(moment(offerEndDate).add('hours', 13).valueOf()));
            this.offerStartDate = new Date(moment(offerStartDate).add('hours', 13).valueOf());
            //this.offerStartTime = new Date(this.offerStartTime.getUTCFullYear(),this.offerStartTime.getUTCMonth(),this.offerStartTime.getUTCDate(),this.offerStartTime.getUTCHours(),this.offerStartTime.getUTCMinutes(),this.offerStartTime.getUTCSeconds());
            //this.offerEndTime = new Date(this.offerEndTime.getUTCFullYear(),this.offerEndTime.getUTCMonth(),this.offerEndTime.getUTCDate(),this.offerEndTime.getUTCHours(),this.offerEndTime.getUTCMinutes(),this.offerEndTime.getUTCSeconds());
            //this.pickupStartTime = new Date(this.pickupStartTime.getUTCFullYear(),this.pickupStartTime.getUTCMonth(),this.pickupStartTime.getUTCDate(),this.pickupStartTime.getUTCHours(),this.pickupStartTime.getUTCMinutes(),this.pickupStartTime.getUTCSeconds());
            //this.pickupEndTime = new Date(this.pickupEndTime.getUTCFullYear(),this.pickupEndTime.getUTCMonth(),this.pickupEndTime.getUTCDate(),this.pickupEndTime.getUTCHours(),this.pickupEndTime.getUTCMinutes(),this.pickupEndTime.getUTCSeconds());
        }
        if (!(this.offerEndDate.getTime() >= this.offerStartDate.getTime())) {
            alert("Promotion end date must be greater than or equal to promotion start date.");
            return false;
        }
        if (!(this.offerStartDate.getTime() >= today.getTime())) {
            alert("Promotion start date must be greater than or equal to Today.");
            return false;
        }
        if (!(this.offerEndTime.getTime() > this.offerStartTime.getTime())) {
            alert("Reservation end time must be greater than reservation start time.");
            return false;
        }
        if (!(this.pickupEndTime.getTime() > this.pickupStartTime.getTime())) {
            alert("Consumption end time must be greater than consumption start time.");
            return false;
        }
        if (!(this.pickupStartTime.getTime() > this.offerStartTime.getTime())) {
            alert("Consumption start time must be greater than reservation start time.");
            return false;
        }
        if (!(this.pickupEndTime.getTime() >= this.offerEndTime.getTime())) {
            alert("Consumption end time must be greater than or equal to reservation end time.");
            return false;
        }
        return true;
    };
    NewOffPeakProductComponent.prototype.close = function () {
        this.showError = false;
    };
    NewOffPeakProductComponent.prototype.showForm = function () {
        return this.authService.isAccountActive();
    };
    NewOffPeakProductComponent.prototype.gotoGallery = function () {
        this.router.navigate(["../../gallery"], { relativeTo: this.route });
    };
    NewOffPeakProductComponent = tslib_1.__decorate([
        Component({
            selector: 'app-new-off-peak-product',
            templateUrl: './new-off-peak-product.component.html',
            styleUrls: ['./new-off-peak-product.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, MatSnackBar, MatDialog, ActivatedRoute, Router, ProductService, FormBuilder])
    ], NewOffPeakProductComponent);
    return NewOffPeakProductComponent;
}());
export { NewOffPeakProductComponent };
//# sourceMappingURL=new-off-peak-product.component.js.map