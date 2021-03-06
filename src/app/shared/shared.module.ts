import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BREAKPOINT, FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomNotificationComponent } from "../components/custom-notification/custom-notification.component";
import { DemoMaterialModule } from "../material/material.module";
import { CodeInputComponent } from "./code-input/code-input.component";
import { DecimalInputComponent } from "./decimal-input/decimal-input.component";
import { SafeHtmlPipe } from "./safe-html-pipe.pipe";
import { SaveConfirmationDialogComponent } from "./save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "./save-progress/save-progress.component";
import { SaveSuccessNotifierComponent } from "./save-success-notifier/save-success-notifier.component";
//import { CustomNotificationComponent } from "./custom-notification/custom-notification.component";

const PRINT_BREAKPOINTS = [
  {
    alias: "xs.print",
    suffix: "XsPrint",
    mediaQuery: "print and (max-width: 297px)",
    overlapping: false,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    DemoMaterialModule,
    DecimalInputComponent,
    CodeInputComponent,
    FlexLayoutModule,
    SafeHtmlPipe,
    CustomNotificationComponent,
  ],
  declarations: [
    SaveConfirmationDialogComponent,
    SaveSuccessNotifierComponent,
    SaveProgressComponent,
    SafeHtmlPipe,
    DecimalInputComponent,
    CodeInputComponent,
    CustomNotificationComponent,
  ],
  providers: [
    { provide: BREAKPOINT, useValue: PRINT_BREAKPOINTS, multi: true },
  ],
})
export class SharedModule {}
