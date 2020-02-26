import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable}  from 'rxjs';
import { UserService }  from './user.service';
import { RevenuRprt } from '../model/revenuRprt';
 
@Injectable({
  providedIn: 'root',
})
export class RevenuRprtResolverService implements Resolve<RevenuRprt[]> {
  constructor(private userSerice: UserService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RevenuRprt[]> | Observable<never> {
     return this.userSerice.getRevenuReport();
  }
}
