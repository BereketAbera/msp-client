import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs/Observable'
import {throwError } from 'rxjs';
import { catchError,map} from 'rxjs/operators';
import {SubCategory} from '../model/sub-category'
import {BehaviorSubject} from "rxjs/BehaviorSubject";

const subcategoryApi = environment.APIEndpoint + "subcategory";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  public countSubject = new BehaviorSubject<number>(0);

  constructor(private http:HttpClient) { }
  
  listSubCategory():  Observable<SubCategory[]> {
    return this.http.get(subcategoryApi).pipe(
      map(
        res => { 
          this.countSubject.next(res['count']);
          return res['rows'];
        }
      ),
      catchError(this.handleError)
    )
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}

