import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { RevenuRprt } from "../model/revenuRprt";
import { UserService } from "./user.service";

@Injectable()
export class RevenuRprtResolverService implements Resolve<RevenuRprt[]> {
  constructor(private userSerice: UserService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<RevenuRprt[]> | Observable<never> {
    return this.userSerice.getRevenuReport(null, null);
  }
}
