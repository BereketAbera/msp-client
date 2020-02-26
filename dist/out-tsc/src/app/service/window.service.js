import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
function _window() {
    // return the global native browser window object
    return window;
}
var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    WindowRef = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], WindowRef);
    return WindowRef;
}());
export { WindowRef };
//# sourceMappingURL=window.service.js.map