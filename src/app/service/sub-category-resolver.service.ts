import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { SubCategory } from "../model/sub-category";
import { SubCategoryService } from "./sub-category.service";

@Injectable()
export class SubCategoryResolverService implements Resolve<SubCategory[]> {
  constructor(
    private subCategorySerice: SubCategoryService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SubCategory[]> | Observable<never> {
    return this.subCategorySerice.listSubCategory().pipe(
      mergeMap((subCategories) => {
        if (subCategories) {
          return of(subCategories);
        } else {
          // id not found
          this.router.navigate(["./shops/newshp"]);
          return EMPTY;
        }
      })
    );
  }
}
