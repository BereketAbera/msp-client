import * as tslib_1 from "tslib";
import { Directive, ViewContainerRef } from '@angular/core';
var PaymentTypeDirective = /** @class */ (function () {
    function PaymentTypeDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    PaymentTypeDirective = tslib_1.__decorate([
        Directive({
            selector: '[appPaymentType]'
        }),
        tslib_1.__metadata("design:paramtypes", [ViewContainerRef])
    ], PaymentTypeDirective);
    return PaymentTypeDirective;
}());
export { PaymentTypeDirective };
//# sourceMappingURL=payment-type.directive.js.map