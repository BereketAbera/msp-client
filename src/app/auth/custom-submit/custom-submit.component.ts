import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "auth-custom-submit",
  templateUrl: "./custom-submit.component.html",
  styleUrls: ["./custom-submit.component.scss"],
})
export class CustomSubmitComponent implements OnInit {
  @Input() text: string = "Save";
  @Input() styleObject: { btn: {} };
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit() {}
}
