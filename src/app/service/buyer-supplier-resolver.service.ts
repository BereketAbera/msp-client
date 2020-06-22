import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Supplier } from "../model/supplier";
import { TransactionService } from "./transaction.service";

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
