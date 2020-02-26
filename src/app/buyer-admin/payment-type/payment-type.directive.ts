import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPaymentType]'
})
export class PaymentTypeDirective {

  constructor(public viewContainerRef:ViewContainerRef) 
  { }

}