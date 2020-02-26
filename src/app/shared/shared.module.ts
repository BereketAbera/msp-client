import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FlexLayoutModule,BREAKPOINT} from '@angular/flex-layout'
import {DemoMaterialModule} from  '../material/material.module';
import { SaveConfirmationDialogComponent}    from './save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveSuccessNotifierComponent} from './save-success-notifier/save-success-notifier.component';
import { SaveProgressComponent } from './save-progress/save-progress.component';
import { SafeHtmlPipe } from './safe-html-pipe.pipe';
import { DecimalInputComponent } from './decimal-input/decimal-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CodeInputComponent } from './code-input/code-input.component';



const PRINT_BREAKPOINTS = [{
    alias: 'xs.print',
    suffix: 'XsPrint',
    mediaQuery: 'print and (max-width: 297px)',
    overlapping: false
  }];
  

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoMaterialModule,
   
    FlexLayoutModule
  ],
  exports:[
    DemoMaterialModule,
    DecimalInputComponent,
    CodeInputComponent,
    FlexLayoutModule,
    
    SafeHtmlPipe
  ],
  declarations: [
    SaveConfirmationDialogComponent,
    SaveSuccessNotifierComponent,
    SaveProgressComponent,
    SafeHtmlPipe,
    DecimalInputComponent,
    CodeInputComponent
  ],
  providers: [{provide: BREAKPOINT, useValue: PRINT_BREAKPOINTS, multi: true}],
})
export class SharedModule {}



