import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../service/user.service";

@Injectable({
  providedIn: "root",
})
export class SellerInfoResolverService {
  constructor(private userSerice: UserService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.paramMap.get("id");
    return this.userSerice.getOneSellerInfo(id);
  }
}
