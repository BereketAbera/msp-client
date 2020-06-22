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
import { ZipCode } from "../model/zipCode";

const zipcodeApi = environment.APIEndpoint + "zipcods";

@Injectable()
export class ZipcodeService {
  public countSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  listZipcods(search): Observable<ZipCode[]> {
    return this.http
      .get(zipcodeApi, {
        params: new HttpParams().set("search", search),
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

  searchAddress(q): Observable<any> {
    return this.http.get(`${zipcodeApi}/search?q=${q}`);
  }
}
