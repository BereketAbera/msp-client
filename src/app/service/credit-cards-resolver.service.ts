import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { CreditCard } from "../model/creditCard";
import { UserService } from "./user.service";

@Injectable()
export class CreditCardsResolverService implements Resolve<CreditCard[]> {
  constructor(private userSerice: UserService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CreditCard[]> | Observable<never> {
    return this.userSerice.getGreditCards();
  }
}
