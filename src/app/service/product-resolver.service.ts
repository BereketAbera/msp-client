import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
 
import { ProductService }  from './product.service';
import { Product } from '../model/product';
 
@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<Product> {
  constructor(private productService: ProductService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Observable<never> {
    let prdctId = route.paramMap.get('id');
    return this.productService.getProduct(prdctId).pipe(
        mergeMap(product => {
        if (product) {
           return of(product);
        } else { // id not found
          this.router.navigate(['./']);
          return EMPTY;
        }
      })
    );
  }
}
