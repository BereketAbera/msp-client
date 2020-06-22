import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { SellerSummary } from "../model/sellerySummary";
import { UserService } from "./user.service";

@Injectable()
export class SellerSummaryResolverService implements Resolve<SellerSummary> {
  constructor(private userSerice: UserService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SellerSummary> | Observable<never> {
    let eDate = route.queryParamMap.get("eDate");
    let sDate = route.queryParamMap.get("sDate");

    return this.userSerice.getSellerSummary(sDate, eDate);
  }
}
