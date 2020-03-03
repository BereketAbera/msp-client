import { Component, ViewEncapsulation, Version } from "@angular/core";
import { VERSION } from "@angular/flex-layout";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "MSP";
  version = VERSION.full;
}
