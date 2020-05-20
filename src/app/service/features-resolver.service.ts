import { Injectable } from "@angular/core";
import { SellerStaffService } from "./seller-staff.service";
import { Router } from "@angular/router";
import { Observable, EMPTY, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Injectable()
export class FeaturesResolverService {
  constructor(
    private sellerStaffService: SellerStaffService,
    private router: Router
  ) {}

  resolve(): Observable<any> | Observable<never> {
    return this.sellerStaffService.getFeatures().pipe(
      mergeMap((data) => {
        if (data.success) {
          return of(data.features);
        } else {
          // id not found
          this.router.navigate(["./tlgu-slr/staffs"]);
          return EMPTY;
        }
      })
    );
  }
}
