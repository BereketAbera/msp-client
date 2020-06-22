import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Markup } from "../model/markup";
import { ProductService } from "./product.service";

@Injectable()
export class MspMarkupResolverService implements Resolve<Markup> {
  constructor(private productService: ProductService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Markup> | Observable<never> {
    let prdctId = +route.paramMap.get("id");
    return this.productService.getMSPMarkup(prdctId);
  }
}
