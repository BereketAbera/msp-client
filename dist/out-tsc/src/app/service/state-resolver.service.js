import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { StateService } from './state.service';
var StateResolverService = /** @class */ (function () {
    function StateResolverService(stateService, router) {
        this.stateService = stateService;
        this.router = router;
    }
    StateResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        return this.stateService.listStates().pipe(mergeMap(function (states) {
            if (states) {
                return of(states);
            }
            else { // id not found
                _this.router.navigate(['./shops/newshp']);
                return EMPTY;
            }
        }));
    };
    StateResolverService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [StateService, Router])
    ], StateResolverService);
    return StateResolverService;
}());
export { StateResolverService };
//# sourceMappingURL=state-resolver.service.js.map