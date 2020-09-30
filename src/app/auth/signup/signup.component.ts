import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  selectedIndex = 0;
  constructor(private route: ActivatedRoute) {
    // route.queryParamMap.subscribe((res) => {
    //   this.selectedIndex = res.get("role") == "seller" ? 1 : 0;
    // });
  }

  ngOnInit(): void {
    // window.scrollTo(0, 0);
  }
}
