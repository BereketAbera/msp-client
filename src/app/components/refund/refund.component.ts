import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-refund",
  templateUrl: "./refund.component.html",
  styleUrls: ["./refund.component.scss"],
})
export class RefundComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
