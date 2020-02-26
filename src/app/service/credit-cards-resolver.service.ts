import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';

 
import { UserService }  from './user.service';
import { CreditCard } from '../model/creditCard';

@Injectable({
  providedIn: 'root',
})
export class CreditCardsResolverService implements Resolve<CreditCard[]> {
  constructor(private userSerice: UserService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CreditCard[]> | Observable<never> {
     return this.userSerice.getGreditCards();
  }
}
