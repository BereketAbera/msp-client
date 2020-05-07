import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerInfoResolverService {
  
  constructor(private userSerice: UserService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
    let id = route.paramMap.get('id');
    console.log(id)
    return this.userSerice.getOneSellerInfo(id);
  }
}
