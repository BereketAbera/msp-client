import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { ShopsService } from "./shops.service";

@Injectable()
export class ShopByIdResolverService {
  constructor(private shopsService: ShopsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    let shopId = route.paramMap.get("id");
    return this.shopsService.getShop(shopId).pipe(
      mergeMap((shop) => {
        if (shop) {
          return of(shop[0]);
        } else {
          // id not found
          this.router.navigate(["./"]);
          return EMPTY;
        }
      })
    );
  }
}
