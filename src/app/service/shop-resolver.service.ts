import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { ShopsService } from "./shops.service";
import { Shop } from "../model/shop";

@Injectable()
export class ShopResolverService implements Resolve<Shop[]> {
  constructor(private shopsSerice: ShopsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Shop[]> | Observable<never> {
    return this.shopsSerice.listShopsForProduct().pipe(
      mergeMap((shops) => {
        if (shops) {
          return of(shops);
        } else {
          // id not found
          this.router.navigate(["./shops/newshp"]);
          return EMPTY;
        }
      })
    );
  }
}
