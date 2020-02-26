import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UploadService } from './upload.service';
var GalleryResolverService = /** @class */ (function () {
    function GalleryResolverService(uploadSerice, router) {
        this.uploadSerice = uploadSerice;
        this.router = router;
    }
    GalleryResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        return this.uploadSerice.listImages().pipe(mergeMap(function (pictures) {
            if (pictures) {
                return of(pictures);
            }
            else { // id not found
                _this.router.navigate(['./gallery/upldimg']);
                return EMPTY;
            }
        }));
    };
    GalleryResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [UploadService, Router])
    ], GalleryResolverService);
    return GalleryResolverService;
}());
export { GalleryResolverService };
//# sourceMappingURL=gallery-resolver.service.js.map