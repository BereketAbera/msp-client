import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-registration-complete",
  templateUrl: "./registration-complete.component.html",
  styleUrls: ["./registration-complete.component.scss"],
})
export class RegistrationCompleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
