import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { BuyerTransaction } from "../model/buyer-transaction";
import { QrCodeData } from "../model/qrCodeData";
import { Supplier } from "../model/supplier";
import { Transaction } from "../model/transaction";
import { TransactionStatus } from "../model/transactionStatus";

const transactionApi = environment.APIEndpoint + "transactions";
@Injectable()
export class TransactionService {
  public countSubject = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {}

  processTakeOutTransaction(transactionId) {
    return this.http
      .post(transactionApi + "/processtransaction", { transactionId })
      .pipe(catchError(this.handleError));
  }
  createTransaction(transaction: Transaction) {
    return this.http
      .post(transactionApi, transaction)
      .pipe(catchError(this.handleError));
  }
  createDeposit(transaction: Transaction) {
    return this.http
      .post(transactionApi + "/deposit", transaction)
      .pipe(catchError(this.handleError));
  }
  acceptOrder(isOk: boolean, id: number | string) {
    return this.http
      .post(transactionApi + "/acptordr", { id: id, isOk: isOk })
      .pipe(catchError(this.handleError));
  }
  processTransactionQRCode(qrCodeData: QrCodeData): Observable<Transaction> {
    let qrDate = {
      trnsId: qrCodeData.transactionId,
      qrCode: qrCodeData.qrCode,
    };
    return this.http.post(transactionApi + "/acceptqrcode", qrDate).pipe(
      map((transaction) => {
        return <Transaction>transaction;
      }),
      catchError(this.handleError)
    );
  }
  processTransactionQRCdCode(qrCodeData: QrCodeData): Observable<Transaction> {
    let qrDate = {
      cd: qrCodeData.code,
      qrCode: qrCodeData.qrCode,
    };
    return this.http.post(transactionApi + "/acceptqrcdcode", qrDate).pipe(
      map((transaction) => {
        return <Transaction>transaction;
      }),
      catchError(this.handleError)
    );
  }
  getQRCode(id: number): Observable<Blob> {
    return this.http
      .get(transactionApi + "/qrcode/" + id, {
        responseType: "blob",
      })
      .pipe(
        map((rslt) => {
          return <Blob>rslt;
        }),
        catchError(this.handleError)
      );
  }
  getQRCodeForTransaction(id: number | string): Observable<QrCodeData> {
    return this.http.get(transactionApi + "/qrdata/" + id).pipe(
      map((transaction) => {
        return <QrCodeData>transaction;
      }),
      catchError(this.handleError)
    );
  }
  getCdCodeForTransaction(cd: String): Observable<QrCodeData> {
    return this.http.get(transactionApi + "/cddata/" + cd).pipe(
      map((transaction) => {
        return <QrCodeData>transaction;
      }),
      catchError(this.handleError)
    );
  }
  getTransactionStatus(id: number | string): Observable<TransactionStatus> {
    return this.http.get(transactionApi + "/trnsStatus/" + id).pipe(
      map((transaction) => {
        return <TransactionStatus>transaction;
      }),
      catchError(this.handleError)
    );
  }
  getOrderSeller(id: number | string): Observable<Transaction> {
    return this.http.get(transactionApi + "/ordrsnnd/" + id).pipe(
      map((transaction) => {
        return <Transaction>transaction;
      }),
      catchError(this.handleError)
    );
  }

  getTransaction(id: number | string): Observable<Transaction> {
    return this.http.get(transactionApi + "/spc/" + id).pipe(
      map((transaction) => {
        return <Transaction>transaction;
      }),
      catchError(this.handleError)
    );
  }
  getSellerTransaction(id: number | string): Observable<Transaction> {
    return this.http.get(transactionApi + "/slrtrnsct/" + id).pipe(
      map((transaction) => {
        return <Transaction>transaction;
      }),
      catchError(this.handleError)
    );
  }
  getSupplier(id: number | string): Observable<Supplier> {
    return this.http.get(transactionApi + "/splir/" + id).pipe(
      map((supplier) => {
        return <Supplier>supplier;
      }),
      catchError(this.handleError)
    );
  }

  listBuyerTransactions(
    usrId: number,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 5
  ): Observable<BuyerTransaction[]> {
    return this.http
      .get(transactionApi + "/buyer", {
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
  listTransactions(
    usrId: number,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 5
  ): Observable<Transaction[]> {
    return this.http
      .get(transactionApi, {
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
  listOrders(
    usrId: number,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 5
  ): Observable<Transaction[]> {
    return this.http
      .get(transactionApi + "/orders", {
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
  listSellersOrders(
    usrId: number,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 5
  ): Observable<Transaction[]> {
    return this.http
      .get(transactionApi + "/slrordrs", {
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
}
