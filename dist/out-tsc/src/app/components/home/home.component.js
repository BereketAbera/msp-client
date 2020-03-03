import * as tslib_1 from "tslib";
import { group, animate, query, transition, style, trigger } from '@angular/animations';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from "@angular/router";
import { timer } from 'rxjs/observable/timer';
import { ProductService } from '../../service/product.service';
import { AuthService } from '../../service/auth.service';
import * as moment from 'moment';
import { FeaturedDataSource } from '../../service/featured-data-source';
import { WindowRef } from '../../service/window.service';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(winRef, route, prdctService, authService) {
        this.winRef = winRef;
        this.route = route;
        this.prdctService = prdctService;
        this.authService = authService;
        this.isUP = false;
        this.source = timer(4000);
        this.dtNow = moment().format("YYYY-MM-DD HH:mm:ss");
        this.backingItems = ['/assets/image/bnr1.jpg?ke=' + this.dtNow, '/assets/image/bnr2.jpg?ke=' + this.dtNow, '/assets/image/bnr3.jpg?ke=' + this.dtNow];
        this.actualIndex = 0;
        this.selectedIndex = 0;
        this.ds = new FeaturedDataSource(this.prdctService);
    }
    ;
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.ngAfterViewChecked = function () {
    };
    HomeComponent.prototype.isIE = function () {
        var match = this.winRef.nativeWindow.navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/);
        var isIE = false;
        if (match !== -1) {
            isIE = true;
        }
        return isIE;
    };
    HomeComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    HomeComponent.prototype.toggleUp = function () {
        var _this = this;
        this.isUP = !this.isUP;
        if (this.isUP)
            this.source.subscribe(function (val) {
                _this.isUP = false;
            });
    };
    Object.defineProperty(HomeComponent.prototype, "items", {
        get: function () {
            return [this.backingItems[this.actualIndex]];
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.gotoCart = function () {
        this.route.navigate(['cart']);
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss'],
            changeDetection: ChangeDetectionStrategy.Default,
            animations: [
                trigger('bannerAnimation', [
                    transition(":increment", group([
                        query(':enter', [
                            animate('0.5s ease-out', style('*'))
                        ]),
                        query(':leave', [
                            animate('0.5s ease-out')
                        ])
                    ])),
                    transition(":decrement", group([
                        query(':enter', [
                            animate('0.5s ease-out', style('*'))
                        ]),
                        query(':leave', [
                            animate('0.5s ease-out')
                        ])
                    ])),
                ])
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [WindowRef, Router, ProductService, AuthService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map