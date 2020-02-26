import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
 
import { UserService }  from './user.service';
import { Transaction } from '../model/transaction';
 
@Injectable({
  providedIn: 'root',
})
export class BuyerOrderResolverService implements Resolve<Transaction> {
  constructor(private userService: UserService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Transaction> | Observable<never> {
    let transactionId = route.paramMap.get('id');
    return this.userService.getTransaction(transactionId).pipe(
        mergeMap(transaction => {
        if (transaction) {
           return of(transaction);
        } else { // id not found
          this.router.navigate(['./']);
          return EMPTY;
        }
      })
    );
  }
}

