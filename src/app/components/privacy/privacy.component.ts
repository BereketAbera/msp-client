import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-privacy",
  templateUrl: "./privacy.component.html",
  styleUrls: ["./privacy.component.scss"],
})
export class PrivacyComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
