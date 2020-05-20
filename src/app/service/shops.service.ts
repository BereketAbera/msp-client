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

const shopCreateApi = environment.APIEndpoint + "shops";

@Injectable()
export class ShopsService {
  public countSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}
  createShope(shop: Shop) {
    return this.http
      .post(shopCreateApi, shop)
      .pipe(catchError(this.handleError));
  }

  updateShop(shop) {
    return this.http
      .put(`${shopCreateApi}/${shop.id}`, shop)
      .pipe(catchError(this.handleError));
  }

  getShop(id) {
    return this.http
      .get(`${shopCreateApi}/${id}`)
      .pipe(catchError(this.handleError));
  }

  listShopsForProduct(): Observable<Shop[]> {
    return this.http.get(shopCreateApi + "/admin").pipe(
      map((res) => {
        this.countSubject.next(res["count"]);
        return res["rows"];
      }),
      catchError(this.handleError)
    );
  }
  listShops(
    usrId: number,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 3
  ): Observable<Shop[]> {
    return this.http
      .get(shopCreateApi, {
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
  removeShop(shopId: number | String) {
    return this.http.delete(shopCreateApi + "/" + shopId).pipe(
      map((shop) => {
        return <Shop>shop;
      }),
      catchError(this.handleError)
    );
  }
}
