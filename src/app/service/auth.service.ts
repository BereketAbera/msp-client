import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";

import { throwError, BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";

import * as moment from "moment";
import jwt_decode from "jwt-decode";

import { catchError, tap, shareReplay, map } from "rxjs/operators";

import { User } from "../model/user";

const authApi = environment.APIEndpoint + "authenticate";
const pwdResetReqApi = environment.APIEndpoint + "pwdrstrqt";

@Injectable()
export class AuthService {
  private _redirectURL: string;
  private _defaultAdminNav = "./tlgu-admin";
  private _defaultSellerNav = "./tlgu-slr";
  private _defaultBuyerNav = "./tlgu-byr";
  private _defaultNav = "./login";
  currentLat: number;
  currentLong: number;
  isGPSOn: boolean = false;
  public progressBarActive = new BehaviorSubject<boolean>(false);
  clientLocation = null;

  constructor(private http: HttpClient) {
    this.clientLocation = JSON.parse(localStorage.getItem("client_address"));
  }
  login(useCredential) {
    return this.http
      .post<HttpResponse<any>>(authApi, useCredential, { observe: "response" })
      .pipe(
        tap((res) => {
          if (res.body["success"]) this.setSession(res.body);
        }),
        map((res) => {
          if (!res.body["success"]) throw res.body;
        }),
        shareReplay()
      );
  }
  reqPwdRest(email) {
    return this.http.post(pwdResetReqApi, email, { observe: "response" }).pipe(
      tap((res) => {
        if (res.body["success"]) return res.body;
      }),
      map((res) => {
        if (!res.body["success"]) throw res.body;
      })
    );
  }
  public getMyStatus() {
    return localStorage.getItem("status");
  }
  public getEmail() {
    return localStorage.getItem("email");
  }
  public getName() {
    return localStorage.getItem("name");
  }

  public getRole() {
    const role = localStorage.getItem("role");
    return role ? role : "ANONYMOUS";
  }
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, "second");
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("role", authResult.role);
    localStorage.setItem("status", authResult.status);
    localStorage.setItem("email", authResult.email);
    localStorage.setItem("name", authResult.name);
  }
  logout() {
    this.redirectURL = null;
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("role");
    localStorage.removeItem("status");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  public isSellerLoggedIn() {
    return moment().isBefore(this.getExpiration()) && this.isSeller();
  }
  public isBuyerLoggedIn() {
    return moment().isBefore(this.getExpiration()) && this.isBuyer();
  }
  public isAdminLoggedIn() {
    return moment().isBefore(this.getExpiration()) && this.isAdmin();
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
  isSeller() {
    const role = localStorage.getItem("role");
    if (role && (role == "SELLER" || role == "SELLER_STAFF")) return true;
    return false;
  }
  isAccountActive() {
    try {
      let status = localStorage.getItem("status");
      let userStatus = parseInt(status.toString());
      if (userStatus == 1) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }
  accountCanScan() {
    try {
      let status = localStorage.getItem("status");
      let userStatus = parseInt(status.toString());
      if (userStatus == 1 || userStatus == 2) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }
  getToken() {
    return localStorage.getItem("id_token");
  }
  isAdmin() {
    const role = localStorage.getItem("role");
    if (role && role == "ADMIN") return true;
    return false;
  }
  isBuyer() {
    const role = localStorage.getItem("role");
    if (role && role == "BUYER") return true;
    return false;
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  get defaultNavigationURL(): string {
    const role = localStorage.getItem("role");
    if (role && role == "BUYER") return this._defaultBuyerNav;
    if (role && role == "SELLER") return this._defaultSellerNav;
    if (role && role == "SELLER_STAFF") return this._defaultSellerNav;
    if (role && role == "ADMIN") return this._defaultAdminNav;
    else return this._defaultNav;
  }
  get redirectURL(): string {
    if (
      localStorage.getItem("rd_url") &&
      localStorage.getItem("rd_url") != "null"
    ) {
      this._redirectURL = localStorage.getItem("rd_url");
      localStorage.removeItem("rd_url");
    }

    return this._redirectURL;
  }
  set redirectURL(rdrcturl: string) {
    localStorage.setItem("rd_url", rdrcturl);
    this._redirectURL = rdrcturl;
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

  getUser() {
    let token = this.getToken();
    let decoded = jwt_decode(token);
    if (decoded) {
      return { id: decoded.id, role: decoded.role };
    }
  }

  setProgress(value) {
    this.progressBarActive.next(value);
  }

  updateClientLocation(obj) {
    this.clientLocation = obj;
  }
}
