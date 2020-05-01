import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Shop } from "../model/shop";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { environment } from "../../environments/environment";
import { ReserveProduct } from "../model/reserve-product";
import { OrderedProduct } from "../model/ordered-product";
import { Order } from "../model/order";

import * as moment from "moment";
const reserveApi = environment.APIEndpoint + "rsrvordr";

@Injectable({
  providedIn: "root",
})
export class CartService {
  public countSubject = new BehaviorSubject<number>(0);
  navbarCartCount: number = 0;
  constructor(private http: HttpClient) {}
  addToCart(rsrvPrdct: ReserveProduct) {
    // console.log(rsrvPrdct);
    return this.http
      .post(reserveApi + "/order", rsrvPrdct)
      .pipe(catchError(this.handleError));
  }
  addToCartTest(rsrvPrdct: ReserveProduct) {
    return this.http
      .post(reserveApi + "/tstorder", rsrvPrdct)
      .pipe(catchError(this.handleError));
  }
  removeFromCart(rsrvPrdct: ReserveProduct) {
    return this.http
      .post(reserveApi + "/rmvrsrvdtl", rsrvPrdct)
      .pipe(catchError(this.handleError));
  }
  isCartExpired(): boolean {
    const order = JSON.parse(localStorage.getItem("msp_cart_items"));
    if (order) {
      if (order.createdAt) {
        let xy = moment(order.createdAt);

        if (moment(order.createdAt).isBefore(moment().subtract(9, "minutes")))
          return true;
      } else return false;
    }
    return false;
  }
  addToLocalCart(data: ReserveProduct, guid: string): void {
    let a: Order;
    a = JSON.parse(localStorage.getItem("msp_cart_items")) || { products: [] };
    if (!a.guid) {
      a.guid = guid;
      a.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    }
    let idx = a.products.findIndex((element) => {
      if (element.prdid == data.prdid) return true;
    });
    if (idx < 0) a.products.push(data);
    else {
      data.qty =
        parseInt(data.qty.toString()) +
        parseInt(a.products[idx].qty.toString());
      a.products[idx] = data;
    }
    localStorage.setItem("msp_cart_items", JSON.stringify(a));
  }
  // Removing cart from local
  removeLocalCartProduct(product: ReserveProduct) {
    const order = JSON.parse(localStorage.getItem("msp_cart_items"));
    for (let i = 0; i < order.products.length; i++) {
      if (order.products[i].prdid === product.prdid) {
        order.products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    if (order.products.length > 0)
      localStorage.setItem("msp_cart_items", JSON.stringify(order));
    else localStorage.removeItem("msp_cart_items");

    this.calculateLocalCartProdCounts();
  }
  resetCart() {
    localStorage.removeItem("msp_cart_items");
  }
  // Fetching Locat CartsProduct
  getLocalCartProducts(): ReserveProduct[] {
    const order: Order = JSON.parse(localStorage.getItem("msp_cart_items"));
    if (order) return order.products;
    else return [];
  }
  getCartGuid(): string {
    const order: Order = JSON.parse(localStorage.getItem("msp_cart_items"));
    if (order) return order.guid;
    else return "";
  }
  // returning LocalCarts Product Count
  calculateLocalCartProdCounts() {
    this.navbarCartCount = this.getLocalCartProducts().length;
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      // );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
