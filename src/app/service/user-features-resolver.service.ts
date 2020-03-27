import { Injectable } from "@angular/core";
import { SellerStaffService } from "./seller-staff.service";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable, EMPTY, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserFeaturesResolverService {
  constructor(
    private sellerStaffService: SellerStaffService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    let id = route.paramMap.get("id");

    return this.sellerStaffService.getUserFeatures(id).pipe(
      mergeMap(data => {
        if (data.success) {
          return of({ data: data.features, userId: id });
        } else {
          // id not found
          this.router.navigate(["./tlgu-slr/staffs"]);
          return EMPTY;
        }
      })
    );
  }
}
