import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Category } from "../model/category";

const categoryApi = environment.APIEndpoint + "category";

@Injectable()
export class CategoryService {
  public countSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  listCategory(): Observable<Category[]> {
    return this.http.get(categoryApi).pipe(
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
