import { Injectable }             from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
 
import { SubCategoryService }  from './sub-category.service';
import { SubCategory } from '../model/sub-category';
 
@Injectable({
  providedIn: 'root',
})
export class SubCategoryResolverService implements Resolve<SubCategory[]> {
  constructor(private subCategorySerice: SubCategoryService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubCategory[]> | Observable<never> {
     return this.subCategorySerice.listSubCategory().pipe(
        mergeMap(subCategories => {
        if (subCategories) {
          return of(subCategories);
        } else { // id not found
          this.router.navigate(['./shops/newshp']);
          return EMPTY;
        }
      })
    );
  }
}

