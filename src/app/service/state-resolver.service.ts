import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

import { StateService } from "./state.service";
import { State } from "../model/state";

@Injectable({
  providedIn: "root",
})
export class StateResolverService implements Resolve<State[]> {
  constructor(private stateService: StateService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<State[]> | Observable<never> {
    return this.stateService.listStates().pipe(
      mergeMap((states) => {
        if (states) {
          return of(states);
        } else {
          // id not found
          // this.router.navigate(['./shops/newshp']);
          return EMPTY;
        }
      })
    );
  }
}
