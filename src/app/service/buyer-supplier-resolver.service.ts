import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { TransactionService } from "./transaction.service";
import { Supplier } from "../model/supplier";

@Injectable()
export class BuyerSupplierResolverService implements Resolve<Supplier> {
  constructor(
    private trnsctService: TransactionService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Supplier> | Observable<never> {
    let transactionId = route.paramMap.get("id");
    return this.trnsctService.getSupplier(transactionId);
  }
}
