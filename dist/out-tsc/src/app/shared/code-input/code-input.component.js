import * as tslib_1 from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, Optional, Self } from '@angular/core';
import { FormBuilder, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
var MyCode = /** @class */ (function () {
    function MyCode(first, second) {
        this.first = first;
        this.second = second;
    }
    return MyCode;
}());
export { MyCode };
var CodeInputComponent = /** @class */ (function () {
    function CodeInputComponent(fb, fm, elRef, ngControl) {
        var _this = this;
        this.fm = fm;
        this.elRef = elRef;
        this.ngControl = ngControl;
        this.stateChanges = new Subject();
        this.focused = false;
        this.errorState = false;
        this.controlType = 'example-tel-input';
        this.id = "example-tel-input-" + CodeInputComponent_1.nextId++;
        this.describedBy = '';
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this._required = false;
        this._disabled = false;
        this.parts = fb.group({
            first: '',
            second: ''
        });
        fm.monitor(elRef, true).subscribe(function (origin) {
            if (_this.focused && !origin) {
                _this.onTouched();
            }
            _this.focused = !!origin;
            _this.stateChanges.next();
        });
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }
    CodeInputComponent_1 = CodeInputComponent;
    Object.defineProperty(CodeInputComponent.prototype, "empty", {
        get: function () {
            var _a = this.parts.value, first = _a.first, second = _a.second;
            return !first && !second;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeInputComponent.prototype, "shouldLabelFloat", {
        get: function () { return this.focused || !this.empty; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeInputComponent.prototype, "placeholder", {
        get: function () { return this._placeholder; },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeInputComponent.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeInputComponent.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            this._disabled ? this.parts.disable() : this.parts.enable();
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeInputComponent.prototype, "value", {
        get: function () {
            var _a = this.parts.value, first = _a.first, second = _a.second;
            if (first.length === 3 && second.length === 3) {
                return new MyCode(first, second);
            }
            return null;
        },
        set: function (tel) {
            var _a = tel || new MyCode('', ''), first = _a.first, second = _a.second;
            this.parts.setValue({ first: first, second: second });
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    CodeInputComponent.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef);
    };
    CodeInputComponent.prototype.setDescribedByIds = function (ids) {
        this.describedBy = ids.join(' ');
    };
    CodeInputComponent.prototype.onContainerClick = function (event) {
        if (event.target.tagName.toLowerCase() != 'input') {
            this.elRef.nativeElement.querySelector('input').focus();
        }
    };
    CodeInputComponent.prototype.writeValue = function (tel) {
        this.value = tel;
    };
    CodeInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CodeInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    CodeInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    CodeInputComponent.prototype._handleInput = function () {
        this.onChange(this.parts.value);
    };
    var CodeInputComponent_1;
    CodeInputComponent.nextId = 0;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], CodeInputComponent.prototype, "placeholder", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], CodeInputComponent.prototype, "required", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], CodeInputComponent.prototype, "disabled", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", MyCode),
        tslib_1.__metadata("design:paramtypes", [MyCode])
    ], CodeInputComponent.prototype, "value", null);
    CodeInputComponent = CodeInputComponent_1 = tslib_1.__decorate([
        Component({
            selector: 'app-code-input',
            templateUrl: './code-input.component.html',
            styleUrls: ['./code-input.component.css'],
            providers: [{ provide: MatFormFieldControl, useExisting: CodeInputComponent_1 }],
            host: {
                '[class.example-floating]': 'shouldLabelFloat',
                '[id]': 'id',
                '[attr.aria-describedby]': 'describedBy',
            }
        }),
        tslib_1.__param(3, Optional()), tslib_1.__param(3, Self()),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            FocusMonitor,
            ElementRef,
            NgControl])
    ], CodeInputComponent);
    return CodeInputComponent;
}());
export { CodeInputComponent };
//# sourceMappingURL=code-input.component.js.map