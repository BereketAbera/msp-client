import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Shop } from "../model/shop";
import { ShopsService } from "./shops.service";

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
