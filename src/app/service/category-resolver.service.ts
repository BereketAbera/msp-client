import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { CategoryService } from "./category.service";
import { Category } from "../model/category";

@Injectable()
export class CategoryResolverService implements Resolve<Category[]> {
  constructor(
    private categorySerice: CategoryService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Category[]> | Observable<never> {
    return this.categorySerice.listCategory().pipe(
      mergeMap((categories) => {
        if (categories) {
          return of(categories);
        } else {
          // id not found
          this.router.navigate(["./shops/newshp"]);
          return EMPTY;
        }
      })
    );
  }
}
