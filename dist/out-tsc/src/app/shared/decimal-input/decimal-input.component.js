import * as tslib_1 from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { MyDecimalInput } from '../../model/my-decimal-input';
var DecimalInputComponent = /** @class */ (function () {
    function DecimalInputComponent(fb, fm, elRef) {
        var _this = this;
        this.fm = fm;
        this.elRef = elRef;
        this.stateChanges = new Subject();
        this.focused = false;
        this.ngControl = null;
        this.errorState = false;
        this.controlType = 'app-decimal-input';
        this.id = "app-decimal-input-" + DecimalInputComponent_1.nextId++;
        this.describedBy = '';
        this._required = false;
        this._disabled = false;
        this.parts = fb.group({
            beforeDecimal: '',
            afterDecimal: '',
        });
        fm.monitor(elRef, true).subscribe(function (origin) {
            _this.focused = !!origin;
            _this.stateChanges.next();
        });
    }
    DecimalInputComponent_1 = DecimalInputComponent;
    Object.defineProperty(DecimalInputComponent.prototype, "empty", {
        get: function () {
            var _a = this.parts.value, area = _a.area, exchange = _a.exchange, subscriber = _a.subscriber;
            return !area && !exchange && !subscriber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecimalInputComponent.prototype, "shouldLabelFloat", {
        get: function () { return this.focused || true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecimalInputComponent.prototype, "placeholder", {
        get: function () { return this._placeholder; },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecimalInputComponent.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecimalInputComponent.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecimalInputComponent.prototype, "value", {
        get: function () {
            var _a = this.parts.value, beforeDecimal = _a.beforeDecimal, afterDecimal = _a.afterDecimal;
            if (beforeDecimal.length > 0 && afterDecimal.length === 2) {
                return new MyDecimalInput(beforeDecimal, afterDecimal);
            }
            return null;
        },
        set: function (tel) {
            var _a = tel || new MyDecimalInput('0', '00'), beforeDecimal = _a.beforeDecimal, afterDecimal = _a.afterDecimal;
            this.parts.setValue({ beforeDecimal: beforeDecimal, afterDecimal: afterDecimal });
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    DecimalInputComponent.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef);
    };
    DecimalInputComponent.prototype.setDescribedByIds = function (ids) {
        this.describedBy = ids.join(' ');
    };
    DecimalInputComponent.prototype.onContainerClick = function (event) {
        if (event.target.tagName.toLowerCase() != 'input') {
            this.elRef.nativeElement.querySelector('input').focus();
        }
    };
    var DecimalInputComponent_1;
    DecimalInputComponent.nextId = 0;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], DecimalInputComponent.prototype, "placeholder", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], DecimalInputComponent.prototype, "required", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], DecimalInputComponent.prototype, "disabled", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", MyDecimalInput),
        tslib_1.__metadata("design:paramtypes", [MyDecimalInput])
    ], DecimalInputComponent.prototype, "value", null);
    DecimalInputComponent = DecimalInputComponent_1 = tslib_1.__decorate([
        Component({
            selector: 'app-decimal-input',
            templateUrl: './decimal-input.component.html',
            styleUrls: ['./decimal-input.component.css'],
            providers: [{ provide: MatFormFieldControl, useExisting: DecimalInputComponent_1 }],
            host: {
                '[class.example-floating]': 'shouldLabelFloat',
                '[id]': 'id',
                '[attr.aria-describedby]': 'describedBy',
            }
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, FocusMonitor, ElementRef])
    ], DecimalInputComponent);
    return DecimalInputComponent;
}());
export { DecimalInputComponent };
//# sourceMappingURL=decimal-input.component.js.map