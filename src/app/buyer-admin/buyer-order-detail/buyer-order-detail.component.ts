import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Supplier } from "../../model/supplier";
import { Transaction } from "../../model/transaction";

@Component({
  selector: "app-buyer-order-detail",
  templateUrl: "./buyer-order-detail.component.html",
  styleUrls: ["./buyer-order-detail.component.scss"],
})
export class BuyerOrderDetailComponent implements OnInit {
  order: Transaction;
  supplier: Supplier;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: { order: Transaction; supplier: Supplier }) => {
        this.order = data.order;
        this.supplier = data.supplier;
      }
    );
  }
  gotoBuyerTrans() {
    this.router.navigate(["../../trnsctns"], { relativeTo: this.route });
  }
}
