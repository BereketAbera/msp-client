import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { ProductService }  from './product.service';
import {Markup} from '../model/markup';

 
@Injectable({
  providedIn: 'root',
})
export class MspMarkupResolverService implements Resolve<Markup> {
  constructor(private productService: ProductService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Markup> | Observable<never> {
    let prdctId = +route.paramMap.get('id');
    return this.productService.getMSPMarkup(prdctId);
  }
}