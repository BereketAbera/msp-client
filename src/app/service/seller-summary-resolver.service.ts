import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

import { UserService } from "./user.service";
import { SellerSummary } from "../model/sellerySummary";

@Injectable()
export class SellerSummaryResolverService implements Resolve<SellerSummary> {
  constructor(private userSerice: UserService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SellerSummary> | Observable<never> {
    return this.userSerice.getSellerSummary();
  }
}
