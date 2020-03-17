import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-custom-notification",
  templateUrl: "./custom-notification.component.html",
  styleUrls: ["./custom-notification.component.scss"]
})
export class CustomNotificationComponent implements OnInit {
  @Input() text: string;
  @Input() show: boolean;
  @Input() type: string;
  @Input() callback;
  @Input() styleObject: { notification: {}; body: {}; icon: {}; text: {} };
  @Output() showNotifications = new EventEmitter();
  constructor(private _location: Location, private router: Router) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.show && changes.show.currentValue) {
      setTimeout(() => {
        // this.show = false;
        if (!this.callback) {
          this.showNotifications.emit(false)
          return;
        } else if (this.callback === "goBack") {
          this._location.back();
        } else {
          this.router.navigate([this.callback]);
        }
       
      }, 2000);
      
     
      
    }
  }
}
