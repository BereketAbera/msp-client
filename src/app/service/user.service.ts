import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpParams} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {throwError, fromEventPattern } from 'rxjs';
import { catchError,map} from 'rxjs/operators';

import { environment } from '../../environments/environment';

import {Balance} from '../model/balance';
import {SellerSummary} from '../model/sellerySummary';
import {CreditCard} from '../model/creditCard';
import {Transaction} from '../model/transaction';
import {Deposit} from '../model/deposit';
import {DailySale} from '../model/daily-sale';
import {Refer} from '../model/refer'

import {RevenuRprt} from '../model/revenuRprt';

const userAPI = environment.APIEndpoint +  "register";
const accountAPI = environment.APIEndpoint +  "accounts";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public countSubject = new BehaviorSubject<number>(0);
  constructor(private http:HttpClient) { }
  registerUser(user:User){
    return this.http.post(userAPI,user).pipe(
        catchError(this.handleError)
    );
  }
  registerSlrUser(user:User){
    return this.http.post(userAPI + '/crtslrfr',user).pipe(
        catchError(this.handleError)
    );
  }
  registerByrUser(user:User){
    return this.http.post(userAPI + '/crtbyrrfr',user).pipe(
        catchError(this.handleError)
    );
  }
  getReferedEmail(tk:string){
    return this.http.get(userAPI + '/rfrdeml',{
      params: new HttpParams()
          .set('tk', tk.toString())
          
  }).pipe(
        catchError(this.handleError)
    );
  }
  inviteBuyers(emails:string[]){
    return this.http.post(accountAPI + "/invtbyrs",emails).pipe(
      catchError(this.handleError)
  );
  }
  isEmailUsed(email:string){
    return this.http.get(accountAPI + '/isemlusd',{
      params: new HttpParams()
          .set('email', email.toString())
          
  }).pipe(
        catchError(this.handleError)
    );
  }
  inviteSellers(emails:string[]){
    return this.http.post(accountAPI + "/invtslrs",emails).pipe(
      catchError(this.handleError)
  );
  }
  getSellerDailySlsSmry(fltrDate:Date|string):Observable<DailySale[]>{
    return this.http.get(accountAPI + "/slsdlysmry",{
      params: new HttpParams()
          .set('datefltr', fltrDate.toString())
          
  }).pipe(
      map(
        res => { 
          this.countSubject.next((<DailySale[]>res).length);
          return <DailySale[]>res;
        }
      ),  
      catchError(this.handleError)
    );
  }
  listRefers(filter = '', sortOrder = 'asc',
  pageNumber = 0, pageSize = 5):  Observable<Refer[]> {
    return this.http.get(accountAPI + "/lstrfrs" ,{
      params: new HttpParams()
         .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
  }).pipe(
      map(
        res => { 
          this.countSubject.next(res['count']);
          return res['rows'];
        }
      ),
      catchError(this.handleError)
    )
  }
  getBalance():Observable<Balance>{
    return this.http.get(accountAPI + "/balance" ).pipe(
      map(
        balance => { 
          if(balance['amount'] && balance['amount'].balance)
            return <Balance>{'amount':balance['amount'].balance};
            else
               if(balance['amount'])
             return <Balance>{'amount':balance['amount']};
               else
               return <Balance>{'amount':0};
        }
      ),  
      catchError(this.handleError)
    );
  }
  getSellerSummary():Observable<SellerSummary>{
    return this.http.get(accountAPI + "/slrsmry" ).pipe(
      map(
        serllerSummary => {
          return <SellerSummary>serllerSummary;

        }
      ),  
      catchError(this.handleError)
    );
  }
  getTransaction(id:number|string):Observable<Transaction>{
    return this.http.get(accountAPI + "/ordr/" +id ).pipe(
      map(
        transaction => { 
          return <Transaction>transaction;
        }
      ),  
      catchError(this.handleError)
    );
  }
  getDeposit(id:number|string):Observable<Deposit>{
    return this.http.get(accountAPI + "/dpst/" +id ).pipe(
      map(
        deposit => { 
          return <Deposit>deposit;
        }
      ),  
      catchError(this.handleError)
    );
  }
  changeUserStatus(id:number,status:number){
    return this.http.post(accountAPI + "/seller",{userId:id,status:status}).pipe(
      catchError(this.handleError)
      );
  }
  
  listMerchants(usrId:number, filter = '', sortOrder = 'asc',
  pageNumber = 0, pageSize = 5):  Observable<User[]> {
    return this.http.get(accountAPI+"/sellers",{
      params: new HttpParams()
          .set('usrId', usrId.toString())
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
  }).pipe(
      map(
        res => { 
          this.countSubject.next(res['count']);
          return res['rows'];
        }
      ),
      catchError(this.handleError)
    )
  }
  getRevenuReport(sDate='',eDate=''):Observable<RevenuRprt[]>{
    return this.http.get(accountAPI + "/rvnurpt",{
      params: new HttpParams()
          .set('sDate', sDate)
          .set('eDate', eDate)
          
  }).pipe(
      map(
        revenuRprt => {
          return <RevenuRprt[]>revenuRprt;
        }
      ),  
      catchError(this.handleError)
    );
  }
  getGreditCards():Observable<CreditCard[]>{
    return this.http.get(accountAPI + "/crdtCrds" ).pipe(
      map(
        res => { 
          return res['rows'];
        }
      ),
      catchError(this.handleError)
    );
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
