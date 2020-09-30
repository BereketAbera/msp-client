import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-common-singup",
  templateUrl: "./common-singup.component.html",
  styleUrls: ["./common-singup.component.scss"],
})
export class CommonSingupComponent implements OnInit {
  selectedIndex: number = 0;
  hide = true;
  errors;
  showError: boolean = false;
  type = "normal";

  constructor() {}

  ngOnInit(): void {}

  // setSelectedIndexBuyer() {
  //   this.selectedIndex = 0;
  //   // this.type = "buyer";
  // }
  // setSelectedIndexSeller() {
  //   this.selectedIndex = 1;
  //   // this.type = "seller";
  // }
}
