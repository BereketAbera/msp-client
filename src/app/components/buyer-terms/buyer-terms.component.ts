import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-buyer-terms",
  templateUrl: "./buyer-terms.component.html",
  styleUrls: ["./buyer-terms.component.scss"],
})
export class BuyerTermsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
