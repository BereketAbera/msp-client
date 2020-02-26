import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private dom: DomSanitizer) {}
  transform(value) {
    return this.dom.bypassSecurityTrustHtml(value);
  }
}
