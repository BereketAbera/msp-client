import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Category } from "../model/category";
import { CategoryService } from "./category.service";

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
