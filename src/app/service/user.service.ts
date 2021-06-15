import { AuthService } from "@app/service/auth.service";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Balance } from "../model/balance";
import { CreditCard } from "../model/creditCard";
import { DailySale } from "../model/daily-sale";
import { Deposit } from "../model/deposit";
import { Refer } from "../model/refer";
import { RevenuRprt } from "../model/revenuRprt";
import { SellerSummary } from "../model/sellerySummary";
import { Transaction } from "../model/transaction";
import { User } from "../model/user";
import { Router } from "@angular/router";

// import { KeyRegistry } from "@angular/core/src/di/reflective_key";

const userAPI = environment.APIEndpoint + "register";
const accountAPI = environment.APIEndpoint + "accounts";
const profileAPI = environment.APIEndpoint + "profile";
let globThis;

@Injectable()
export class UserService {
  public countSubject = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    globThis = this;
  }
  registerUser(user: any, pid: string = null, rid: string = null) {
    console.log(pid, rid);
    return this.http
      .post(pid && rid ? userAPI + `?pid=${pid}&rid=${rid}` : userAPI, user)
      .pipe(catchError(this.handleError));
  }
  registerSlrUser(user: any, points: string = null) {
    return this.http
      .post(points ? userAPI + `/crtslrfr?points=${points}` : userAPI + `/crtslrfr`, user)
      .pipe(catchError(this.handleError));
  }
  registerByrUser(user: User, points: string = null) {
    return this.http
      .post(points ? userAPI + `/crtbyrrfr?points=${points}` : userAPI + `/crtbyrrfr`, user)
      .pipe(catchError(this.handleError));
  }
  getReferedEmail(tk: string) {
    return this.http
      .get(userAPI + "/rfrdeml", {
        params: new HttpParams().set("tk", tk.toString())
      })
      .pipe(catchError(this.handleError));
  }
  inviteBuyers(emails: string[]) {
    return this.http.post(accountAPI + "/invtbyrs", emails).pipe(catchError(this.handleError));
  }
  isEmailUsed(email: string) {
    return this.http
      .get(accountAPI + "/isemlusd", {
        params: new HttpParams().set("email", email.toString())
      })
      .pipe(catchError(this.handleError));
  }
  inviteSellers(emails: string[]) {
    return this.http.post(accountAPI + "/invtslrs", emails).pipe(catchError(this.handleError));
  }
  getSellerDailySlsSmry(
    fltrDate: Date | string,
    fltrEnd,
    pageNumber: Number,
    pageSize: Number
  ): Observable<DailySale[]> {
    return this.http
      .get(accountAPI + "/slsdlysmry", {
        params: new HttpParams()
          .set("startDate", fltrDate.toString())
          .set("endDate", fltrEnd.toString())
          .set("pageNumber", pageNumber.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(
        map((res) => {
          this.countSubject.next((<DailySale[]>res).length);
          return <DailySale[]>res;
        }),
        catchError(this.handleError)
      );
  }
  listRefers(filter = "", sortOrder = "asc", pageNumber = 0, pageSize = 5): Observable<Refer[]> {
    return this.http
      .get(accountAPI + "/lstrfrs", {
        params: new HttpParams()
          .set("filter", filter)
          .set("sortOrder", sortOrder)
          .set("pageNumber", pageNumber.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(
        map((res) => {
          this.countSubject.next(res["count"]);
          return res["rows"];
        }),
        catchError(this.handleError)
      );
  }
  getBalance(): Observable<Balance> {
    return this.http.get(accountAPI + "/balance").pipe(
      map((balance) => {
        if (balance["amount"] && balance["amount"].balance)
          return <Balance>{ amount: balance["amount"].balance };
        else if (balance["amount"]) return <Balance>{ amount: balance["amount"] };
        else return <Balance>{ amount: 0 };
      }),
      catchError(this.handleError)
    );
  }
  getSellerSummary(sDate, eDate): Observable<SellerSummary> {
    let queryParams = this.getQueryParams({ sDate, eDate });
    return this.http.get(accountAPI + "/slrsmry" + queryParams).pipe(
      map((serllerSummary) => {
        return <SellerSummary>serllerSummary;
      }),
      catchError(this.handleError)
    );
  }
  getTransaction(id: number | string): Observable<Transaction> {
    return this.http.get(accountAPI + "/ordr/" + id).pipe(
      map((transaction) => {
        return <Transaction>transaction;
      }),
      catchError(this.handleError)
    );
  }
  getDeposit(id: number | string): Observable<Deposit> {
    return this.http.get(accountAPI + "/dpst/" + id).pipe(
      map((deposit) => {
        return <Deposit>deposit;
      }),
      catchError(this.handleError)
    );
  }
  changeUserStatus(id: number, status: number) {
    return this.http
      .post(accountAPI + "/seller", { sellerProfileId: id, status: status })
      .pipe(catchError(this.handleError));
  }

  filterSeller(
    companyName = "",
    city = "",
    state = "",
    status,
    shop = "",
    pageNumber = 0,
    pageSize = 5,
    sortOrder,
    sortedBy,
    referralLinkKey
  ): Observable<any[]> {
    return this.http
      .get(accountAPI + "/seller/filter", {
        params: new HttpParams()
          .set("companyName", companyName)
          .set("city", city)
          .set("state", state)
          .set("status", status)
          .set("shop", shop)
          .set("pageNumber", pageNumber.toString())
          .set("pageSize", pageSize.toString())
          .set("sortOrder", sortOrder)
          .set("sortedBy", sortedBy)
          .set("referralLinkKey", referralLinkKey)
      })
      .pipe(
        map((res) => {
          // console.log(res, "res");
          this.countSubject.next(res["count"]);
          return res["rows"];
        }),
        catchError(this.handleError)
      );
  }

  getOneSellerInfo(id) {
    return this.http
      .get(accountAPI + "/seller/detail", {
        params: new HttpParams().set("id", id)
      })
      .pipe(
        map((seller) => {
          return <any>seller;
        }),
        catchError(this.handleError)
      );
  }
  listMerchants(
    usrId: number,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 5
  ): Observable<User[]> {
    return this.http
      .get(accountAPI + "/sellers", {
        params: new HttpParams()
          .set("usrId", usrId.toString())
          .set("filter", filter)
          .set("sortOrder", sortOrder)
          .set("pageNumber", pageNumber.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(
        map((res) => {
          this.countSubject.next(res["count"]);
          return res["rows"];
        }),
        catchError(this.handleError)
      );
  }
  getRevenuReport(sDate = "", eDate = ""): Observable<RevenuRprt[]> {
    let queryParams = this.getQueryParams({ sDate, eDate });
    return this.http.get(accountAPI + "/rvnurpt" + queryParams).pipe(
      map((revenuRprt) => {
        return <RevenuRprt[]>revenuRprt;
      }),
      catchError(this.handleError)
    );
  }

  getGreditCards(): Observable<CreditCard[]> {
    return this.http.get(accountAPI + "/crdtCrds").pipe(
      map((res) => {
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
      if (error.status == 401) {
        // console.log("unoutorized from user service ...");
        globThis.authService.logout();
        globThis.router.navigateByUrl("/login");
      }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  getSellerProfile(): Observable<any> {
    return this.http.get(profileAPI + "/seller").pipe(
      map((res) => {
        return res["profile"];
      }),
      catchError(this.handleError)
    );
  }

  updateSellerProfile(profile): Observable<any> {
    return this.http.put(profileAPI + "/seller", profile);
  }

  updateProfile(profile): Observable<any> {
    return this.http.put(accountAPI + "/user", profile);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(accountAPI + "/user");
  }

  sendPhonenNumberCode(phoneNumber): Observable<any> {
    return this.http.post(profileAPI + "/send_phonenumber_code", {
      phoneNumber
    });
  }

  changePhoneNumber(code, type = "user"): Observable<any> {
    return this.http.post(profileAPI + "/change_phone_number", { code, type });
  }

  getQueryParams(obj) {
    let keys = Object.keys(obj);
    let url = "?";
    keys.map((key) => {
      if (obj[key]) {
        url = url + `${key}=${obj[key]}&`;
      }
    });

    return url.slice(0, url.length - 1);
  }
}
