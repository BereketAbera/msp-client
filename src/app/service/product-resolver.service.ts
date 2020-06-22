import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Product } from "../model/product";
import { ProductService } from "./product.service";

@Injectable()
export class ProductResolverService implements Resolve<Product> {
  constructor(private productService: ProductService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> | Observable<never> {
    let prdctId = route.paramMap.get("id");
    return this.productService.getProduct(prdctId).pipe(
      mergeMap((product) => {
        if (product) {
          return of(product);
        } else {
          // id not found
          this.router.navigate(["./"]);
          return EMPTY;
        }
      })
    );
  }
}
