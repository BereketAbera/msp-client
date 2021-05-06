import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { EMPTY } from "rxjs";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { AdminService } from "./admin.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AdminAssistantResolverService {
  constructor(
    private adminService: AdminService,
    private router: Router,
    public authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    this.authService.progressBarActive.next(true);
    return this.adminService.getAssistants(1).pipe(
      mergeMap((assistant) => {
        if (assistant) {
          this.authService.progressBarActive.next(false);
          return of(assistant);
        } else {
          this.authService.progressBarActive.next(false);
          return EMPTY;
        }
      })
    );
  }
}
