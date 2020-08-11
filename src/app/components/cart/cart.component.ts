import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ReserveProduct } from "../../model/reserve-product";
import { CartService } from "../../service/cart.service";
import { CartExpiredDialogComponent } from "../cart-expired-dialog/cart-expired-dialog.component";
import { ThrowStmt } from "@angular/compiler";

// import { copyStyles } from "@angular/animations/browser/src/util";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cartProducts: ReserveProduct[];
  showDataNotFound = true;
  total: number = 0;
  normal: number = 0;
  totalMSPMarkup: number = 0;
  empty = true;
  showDetail = {};

  // Not Found Message
  messageTitle = "No Products Found in Cart";
  messageDescription = "Please, Add Products to Cart";

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getCartProduct();
    this.getTotalPrice();
    if (this.cartService.isCartExpired()) {
      this.showResetDialog();
    }
  }
  removeCartProduct(product: ReserveProduct) {
    this.cartService.removeFromCart(product).subscribe((rmvRes) => {
      if (rmvRes["success"]) {
        this.cartService.removeLocalCartProduct(product);
        this.getCartProduct();
        window.scrollTo(0, 0);
      }
    });
  }
  getCartProduct() {
    this.cartProducts = this.cartService.getLocalCartProducts();
    this.getTotalPrice();
    // console.log(this.cartProducts);
  }
  getTotalPrice() {
    this.total = 0;
    this.totalMSPMarkup = 0;
    this.normal = 0;
    if (this.cartProducts.length > 0) {
      this.cartProducts.forEach((element) => {
        this.total += element.disPrice * element.qty;
        this.normal += element.regPrice * element.qty;
        this.totalMSPMarkup +=
          (element.disPrice * element.qty * element.mspMarkup) / 100;
      });
    } else {
      this.total = 0;
      this.totalMSPMarkup = 0;
      this.normal = 0;
    }
  }
  showResetDialog() {
    const dialogRef = this.dialog.open(CartExpiredDialogComponent, {
      width: "350px",
      data: {
        title: "Cart Time Expired",
        message:
          "Sorry, your shopping cart time limit of ten minutes has expired",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.cartService.resetCart();
      this.router.navigate(["../"]);
    });
  }
  gotoHome() {
    if (this.cartService.isCartExpired()) {
      this.showResetDialog();
    } else {
      this.router.navigate(["../"]);
    }
  }
  gotoBuyerAdmin() {
    if (this.cartService.isCartExpired()) {
      this.showResetDialog();
    } else {
      if (this.cartProducts.length > 0) {
        this.router.navigate(["/tlgu-byr/payment", 12]);
      } else {
        alert("");
      }
    }
  }

  showProductDetail(prdid) {
    let pre = this.showDetail[`pr${prdid}`];
    this.showDetail = {};
    this.showDetail[`pr${prdid}`] = !pre;
  }

  getProductShow(prdid) {
    return this.showDetail[`pr${prdid}`];
  }

  productDetail(p) {
    this.router.navigate(["/deal", p.prdid], {
      queryParams: {
        takeOut: p.takeOut,
        specialRequirements: p.specialRequirements,
        quantity: p.qty,
        pickUpTime: p.pickUpTime,
      },
    });
  }
}
