import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Product } from "../model/product";
import { ShopInfo } from "../model/shop-info";
import { Markup } from "../model/markup";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { environment } from "../../environments/environment";

import * as moment_ from "moment";
const moment = moment_;

const productApi = environment.APIEndpoint + "products";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  public countSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}
  createProduct(product: Product) {
    return this.http
      .post(productApi, product)
      .pipe(catchError(this.handleError));
  }

  editProduct(product) {
    return this.http
      .put(productApi, product)
      .pipe(catchError(this.handleError));
  }
  getProductById(id): Observable<any> {
    return this.http.get<any>(`${productApi}/product/${id}`);
  }
  removeProduct(productId: number | String) {
    return this.http.delete(productApi + "/" + productId).pipe(
      map((product) => {
        return <Product>product;
      }),
      catchError(this.handleError)
    );
  }
  getShopInfo(prdId, lat, lng): Observable<ShopInfo> {
    return this.http
      .get(productApi + "/shplctn", {
        params: new HttpParams()
          .set("prdId", prdId.toString())
          .set("lat", lat.toString())
          .set("lng", lng.toString()),
      })
      .pipe(
        map((res) => {
          return <ShopInfo>res;
        }),
        catchError(this.handleError)
      );
  }
  listProductsSeller(
    usrId: number,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 5
  ): Observable<Product[]> {
    return this.http
      .get(productApi + "/admin/seller", {
        params: new HttpParams()
          .set("usrId", usrId.toString())
          .set("filter", filter)
          .set("sortOrder", sortOrder)
          .set("pageNumber", pageNumber.toString())
          .set("pageSize", pageSize.toString()),
      })
      .pipe(
        map((res) => {
          this.countSubject.next(res["count"]);
          return res["rows"];
        }),
        catchError(this.handleError)
      );
  }

  getListOfProducts(
    distance,
    lat,
    lng,
    subCategoryId,
    filter,
    sortOrder,
    pageNumber,
    pageSize,
    storeId,
    query
  ) {
    // console.log(
    //   `/company/product?distance=${distance}&lat=${lat}&q=${query}&lng=${lng}&storeId=${storeId}${
    //     subCategoryId ? "&subCategoryId=" + subCategoryId : ""
    //   }`
    // );
    return this.http
      .get(
        productApi +
          `/company/product?distance=${distance}&lat=${lat}&q=${query}&lng=${lng}&storeId=${storeId}${
            subCategoryId ? "&subCategoryId=" + subCategoryId : ""
          }`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  listCompaniesProducts(
    page,
    latitude,
    longitude,
    subCategoryId
  ): Observable<any> {
    // console.log(latitude, longitude);
    return this.http
      .get(
        `${productApi}/company?page=${page}&lat=${latitude}&lng=${longitude}&subCategoryId=${subCategoryId}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  listProductsHomeA(
    distance,
    lat,
    lng,
    subCataogryId,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 5
  ): Observable<Product[]> {
    return this.http
      .get(productApi + "/home", {
        params: new HttpParams()
          .set("distance", distance)
          .set("lat", lat)
          .set("lng", lng)
          .set("subCatagoryId", subCataogryId)
          .set("filter", filter)
          .set("sortOrder", sortOrder)
          .set("pageNumber", pageNumber.toString())
          .set("pageSize", pageSize.toString())
          .set("timeZoneDiff", new Date().getTimezoneOffset().toString()),
      })
      .pipe(
        map((res) => {
          this.countSubject.next(res["count"]);
          return res["rows"];
        }),
        catchError(this.handleError)
      );
  }
  listProductsHomeUTC(
    utcTime,
    distance,
    lat,
    lng,
    subCataogryId,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 5
  ): Observable<Product[]> {
    return this.http
      .get(productApi + "/homeutc", {
        params: new HttpParams()
          .set("utcTime", utcTime)
          .set("distance", distance)
          .set("lat", lat)
          .set("lng", lng)
          .set("subCatagoryId", subCataogryId)
          .set("filter", filter)
          .set("sortOrder", sortOrder)
          .set("pageNumber", pageNumber.toString())
          .set("pageSize", pageSize.toString())
          .set("timeZoneDiff", new Date().getTimezoneOffset().toString()),
      })
      .pipe(
        map((res) => {
          this.countSubject.next(res["count"]);
          return res["rows"];
        }),
        catchError(this.handleError)
      );
  }
  listProductsHome(): Observable<Product[]> {
    return this.http.get(productApi).pipe(
      map((res) => {
        this.countSubject.next(res["count"]);
        return res["rows"];
      }),
      catchError(this.handleError)
    );
  }
  getProduct(id: string | number): Observable<Product> {
    return this.http.get(productApi + "/public/" + id).pipe(
      map((product) => {
        return <Product>product;
      }),
      catchError(this.handleError)
    );
  }
  getMarkup(): Observable<number> {
    return this.http.get(productApi + "/tlgumrkup").pipe(
      map((markup) => {
        return +markup["talguuMarkup"];
      }),
      catchError(this.handleError)
    );
  }
  getMSPMarkup(productId: number): Observable<Markup> {
    return this.http.get(productApi + "/mspmrkup/" + productId).pipe(
      map((markup) => {
        return { mspMarkup: +markup["mspMarkup"] };
      }),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
