import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataStorageService } from '../../service/data-storage.service';
import { CartService } from '../../service/cart.service';
import { ReserveProduct } from '../../model/reserve-product';
import { Order } from '../../model/order';
import { CartExpiredDialogComponent } from '../cart-expired-dialog/cart-expired-dialog.component';
import * as moment from 'moment';
var DealDetailComponent = /** @class */ (function () {
    function DealDetailComponent(dialog, cartService, dsSerive, route, router, fb) {
        this.dialog = dialog;
        this.cartService = cartService;
        this.dsSerive = dsSerive;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.buyForm = this.fb.group({
            quantity: ["1", Validators.required]
        });
    }
    DealDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.product = data.product;
            _this.markup = data.mspMarkup;
            _this.product.quantityOnHand = _this.getTodaysQuantityOnHand();
            var date = new Date();
            var offerEndTime = new Date(moment(_this.product.offerEndTime).format('YYYY-MM-DD HH:mm:ss'));
            var newDate = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), offerEndTime.getHours(), offerEndTime.getMinutes(), 0);
            console.log(newDate);
            console.log((new Date()));
            if (_this.product.shop.state != "AZ") {
                _this.showFarFarmYouDialog();
            }
            else if (newDate.getTime() <= (new Date()).getTime()) {
                _this.showDeadlineDialog();
            }
        });
    };
    DealDetailComponent.prototype.gotoCart = function () {
        this.router.navigate(['../../cart']);
    };
    DealDetailComponent.prototype.cancel = function () {
        this.router.navigate(['../']);
    };
    DealDetailComponent.prototype.showResetDialog = function () {
        var _this = this;
        Promise.resolve().then(function () {
            var dialogRef = _this.dialog.open(CartExpiredDialogComponent, {
                width: '250px',
                data: { title: "Cart Time Expired", message: "Sorry, your shopping cart time limit of ten minutes has expired" }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                _this.cartService.resetCart();
                _this.router.navigate(['../']);
            });
        });
    };
    DealDetailComponent.prototype.showFarFarmYouDialog = function () {
        var _this = this;
        Promise.resolve().then(function () {
            var dialogRef = _this.dialog.open(CartExpiredDialogComponent, {
                width: '250px',
                data: { title: "", message: "Sorry, store too far from you." }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                _this.router.navigate(['../']);
            });
        });
    };
    DealDetailComponent.prototype.showDeadlineDialog = function () {
        var _this = this;
        Promise.resolve().then(function () {
            var dialogRef = _this.dialog.open(CartExpiredDialogComponent, {
                width: '250px',
                data: { title: "Deadline Expired", message: "Sorry, Reservation Deadline has expired." }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                _this.cartService.resetCart();
                _this.router.navigate(['../']);
            });
        });
    };
    DealDetailComponent.prototype.addToCart = function () {
        var _this = this;
        if (this.cartService.isCartExpired()) {
            this.cartService.resetCart();
        }
        var a;
        if (this.product.quantityOnHand >= this.buyForm.get('quantity').value && this.buyForm.get('quantity').value > 0) {
            a = JSON.parse(localStorage.getItem('msp_cart_items')) || new Order();
            var reserveProduct_1 = new ReserveProduct();
            reserveProduct_1.ordruid = a.guid;
            reserveProduct_1.prdid = this.product.id;
            reserveProduct_1.qty = this.buyForm.get('quantity').value;
            this.cartService.addToCart(reserveProduct_1).subscribe(function (rsrvdPrd) {
                if (rsrvdPrd['success']) {
                    reserveProduct_1.name = _this.product.name;
                    reserveProduct_1.imagePath = _this.product.imagePath;
                    reserveProduct_1.description = _this.product.description;
                    reserveProduct_1.unitPrice = _this.product.discountPrice;
                    reserveProduct_1.regPrice = _this.product.normalPrice;
                    reserveProduct_1.disPrice = _this.product.discountPrice;
                    reserveProduct_1.mspMarkup = _this.markup.mspMarkup;
                    reserveProduct_1.ordruid = rsrvdPrd['guid'];
                    _this.cartService.addToLocalCart(reserveProduct_1, rsrvdPrd['guid']);
                    _this.router.navigate(['../../cart']);
                }
                else
                    alert(rsrvdPrd['messages']);
            });
        }
        else {
            alert("quantiy can not be less than 0 or greater than " + this.product.quantityOnHand);
        }
    };
    DealDetailComponent.prototype.getTodaysQuantityOnHand = function () {
        var dwn = (new Date()).getDay();
        if (dwn == 1) {
            //query = query + " modInit > 0 and modToday > 0 "
            return this.product.modToday;
        }
        else if (dwn == 2) {
            //query = query + " tueInit > 0 and tueToday > 0 "
            return this.product.tueToday;
        }
        else if (dwn == 3) {
            //query = query + " wedInit > 0 and wedToday > 0 "
            return this.product.wedToday;
        }
        else if (dwn == 4) {
            //query = query + " thuInit > 0 and thuToday > 0 "
            return this.product.thuToday;
        }
        else if (dwn == 5) {
            //query = query + " friInit > 0 and friToday > 0 "
            return this.product.friToday;
        }
        else if (dwn == 6) {
            //query = query + " satInit > 0 and satToday > 0 "
            return this.product.satToday;
        }
        else {
            //query = query + " sunInit > 0 and sunToday > 0 "
            return this.product.sunToday;
        }
    };
    DealDetailComponent.prototype.gotoBuyerAdmin = function () {
        if (this.product.quantityOnHand >= this.buyForm.get('quantity').value && this.buyForm.get('quantity').value > 0) {
            console.log(this.buyForm.get('quantity').value);
            this.dsSerive.selectedProductInfo = {
                productId: this.product.id,
                quantity: this.buyForm.get('quantity').value
            };
            var navigationExtras = {
                queryParams: {
                    "productId": this.product.id,
                    "quantity": this.buyForm.get('quantity').value
                }
            };
            this.router.navigate(['/tlgu-byr/payment', this.product.id], navigationExtras);
        }
        else {
            alert("quantiy can not be less than 0 or greater than " + this.product.quantityOnHand);
        }
    };
    DealDetailComponent.prototype.onSubmit = function () {
    };
    DealDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-deal-detail',
            templateUrl: './deal-detail.component.html',
            styleUrls: ['./deal-detail.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog, CartService, DataStorageService, ActivatedRoute, Router, FormBuilder])
    ], DealDetailComponent);
    return DealDetailComponent;
}());
export { DealDetailComponent };
//# sourceMappingURL=deal-detail.component.js.map