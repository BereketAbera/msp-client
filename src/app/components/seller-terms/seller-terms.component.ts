import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-seller-terms",
  templateUrl: "./seller-terms.component.html",
  styleUrls: ["./seller-terms.component.scss"],
})
export class SellerTermsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
