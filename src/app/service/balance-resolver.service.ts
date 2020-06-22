import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Balance } from "../model/balance";
import { UserService } from "./user.service";

@Injectable()
export class BalanceResolverService implements Resolve<Balance> {
  constructor(private userSerice: UserService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Balance> | Observable<never> {
    return this.userSerice.getBalance();
  }
}
