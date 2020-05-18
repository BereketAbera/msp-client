import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { State } from '../model/state';
import { mergeMap } from 'rxjs/operators';
import { SellerStaffService } from './seller-staff.service';

@Injectable({
  providedIn: 'root'
})
export class StaffResolverService {
  constructor(private sellerStaffService: SellerStaffService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<State[]> | Observable<never> {
    return this.sellerStaffService.getStaffs(1).pipe(
      mergeMap((staff) => {
        if (staff) {
          return of(staff);
        } else {
          // id not found
          // this.router.navigate(['./shops/newshp']);
          return EMPTY;
        }
      })
    );
  }

}
