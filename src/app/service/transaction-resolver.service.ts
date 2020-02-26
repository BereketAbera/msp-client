import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
 
import { TransactionService }  from './transaction.service';
import { Transaction } from '../model/transaction';
 
@Injectable({
  providedIn: 'root',
})
export class TransactionResolverService implements Resolve<Transaction> {
  constructor(private transactionService: TransactionService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Transaction> | Observable<never> {
    let transactionId = route.paramMap.get('id');
    return this.transactionService.getTransaction(transactionId).pipe(
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
