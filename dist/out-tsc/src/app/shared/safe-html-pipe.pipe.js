import * as tslib_1 from "tslib";
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe } from '@angular/core';
var SafeHtmlPipe = /** @class */ (function () {
    function SafeHtmlPipe(dom) {
        this.dom = dom;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        return this.dom.bypassSecurityTrustHtml(value);
    };
    SafeHtmlPipe = tslib_1.__decorate([
        Pipe({ name: 'safeHtml' }),
        tslib_1.__metadata("design:paramtypes", [DomSanitizer])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());
export { SafeHtmlPipe };
//# sourceMappingURL=safe-html-pipe.pipe.js.map