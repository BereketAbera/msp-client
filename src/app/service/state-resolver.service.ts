import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { State } from "../model/state";
import { StateService } from "./state.service";

@Injectable()
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
