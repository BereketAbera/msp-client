import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../service/cart.service';
import { CartExpiredDialogComponent } from '../cart-expired-dialog/cart-expired-dialog.component';
var CartComponent = /** @class */ (function () {
    function CartComponent(dialog, cartService, router) {
        this.dialog = dialog;
        this.cartService = cartService;
        this.router = router;
        this.showDataNotFound = true;
        this.total = 0;
        this.normal = 0;
        this.totalMSPMarkup = 0;
        // Not Found Message
        this.messageTitle = 'No Products Found in Cart';
        this.messageDescription = 'Please, Add Products to Cart';
    }
    CartComponent.prototype.ngOnInit = function () {
        this.getCartProduct();
        this.getTotalPrice();
        if (this.cartService.isCartExpired()) {
            this.showResetDialog();
        }
    };
    CartComponent.prototype.removeCartProduct = function (product) {
        var _this = this;
        this.cartService.removeFromCart(product).subscribe(function (rmvRes) {
            if (rmvRes['success']) {
                _this.cartService.removeLocalCartProduct(product);
                _this.getCartProduct();
            }
        });
    };
    CartComponent.prototype.getCartProduct = function () {
        this.cartProducts = this.cartService.getLocalCartProducts();
        this.getTotalPrice();
    };
    CartComponent.prototype.getTotalPrice = function () {
        var _this = this;
        this.total = 0;
        this.totalMSPMarkup = 0;
        this.normal = 0;
        if (this.cartProducts.length > 0) {
            this.cartProducts.forEach(function (element) {
                _this.total += element.disPrice * element.qty;
                _this.normal += element.regPrice * element.qty;
                _this.totalMSPMarkup += element.disPrice * element.qty * element.mspMarkup / 100;
            });
        }
        else {
            this.total = 0;
            this.totalMSPMarkup = 0;
            this.normal = 0;
        }
    };
    CartComponent.prototype.showResetDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(CartExpiredDialogComponent, {
            width: '250px',
            data: { titel: "Cart Time Expired", message: "Sorry, your shopping cart time limit of ten minutes has expired" }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.cartService.resetCart();
            _this.router.navigate(['../']);
        });
    };
    CartComponent.prototype.gotoHome = function () {
        if (this.cartService.isCartExpired()) {
            this.showResetDialog();
        }
        else {
            this.router.navigate(['../']);
        }
    };
    CartComponent.prototype.gotoBuyerAdmin = function () {
        if (this.cartService.isCartExpired()) {
            this.showResetDialog();
        }
        else {
            if (this.cartProducts.length > 0) {
                this.router.navigate(['/tlgu-byr/payment', 12]);
            }
            else {
                alert("");
            }
        }
    };
    CartComponent = tslib_1.__decorate([
        Component({
            selector: 'app-cart',
            templateUrl: './cart.component.html',
            styleUrls: ['./cart.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog, CartService, Router])
    ], CartComponent);
    return CartComponent;
}());
export { CartComponent };
//# sourceMappingURL=cart.component.js.map