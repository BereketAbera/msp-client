import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-save-success-notifier",
  templateUrl: "./save-success-notifier.component.html",
  styles: [
    `
      .success-save {
        color: hotpink;
      }
    `,
  ],
})
export class SaveSuccessNotifierComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
