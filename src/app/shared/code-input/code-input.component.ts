import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, ElementRef, Input, OnDestroy, Optional, Self} from '@angular/core';
import {FormBuilder, FormGroup, ControlValueAccessor, NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs';
export class MyCode {
  constructor(public first: string, public second: string) {}
}
@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: CodeInputComponent}],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class CodeInputComponent implements ControlValueAccessor, MatFormFieldControl<MyCode>, OnDestroy {
  static nextId = 0;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'example-tel-input';
  id = `example-tel-input-${CodeInputComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    const {value: {first, second}} = this.parts;

    return !first && !second
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): MyCode | null {
    const {value: {first, second }} = this.parts;
    if (first.length === 3 && second.length === 3) {
      return new MyCode(first, second);
    }
    return null;
  }
  set value(tel: MyCode | null) {
    const {first, second} = tel || new MyCode('', '');
    this.parts.setValue({first, second});
    this.stateChanges.next();
  }

  constructor(
    fb: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = fb.group({
      first: '',
      second: ''
     
    });

    fm.monitor(elRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input')!.focus();
    }
  }

  writeValue(tel: MyCode | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.parts.value);
  }
}
