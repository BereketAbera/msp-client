import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { filter } from 'rxjs/operators/filter';
import { switchMap } from 'rxjs/operators/switchMap';
import { Shop } from '../../model/shop';
import { Router, ActivatedRoute } from '@angular/router';
import { GeocoderService } from '../../service/geocoder.service';
import { ShopsService } from "../../service/shops.service";
import { MatSnackBar } from '@angular/material';
import { ZipcodeService } from '../../service/zipcode.service';
import { StateService } from '../../service/state.service';
import { AuthService } from '../../service/auth.service';
var NewShopComponent = /** @class */ (function () {
    function NewShopComponent(stateService, authService, shopsSrvc, route, snackBar, router, fb, geocoderService, zipcodeService) {
        this.stateService = stateService;
        this.authService = authService;
        this.shopsSrvc = shopsSrvc;
        this.route = route;
        this.snackBar = snackBar;
        this.router = router;
        this.fb = fb;
        this.geocoderService = geocoderService;
        this.zipcodeService = zipcodeService;
        this.showError = false;
        this.errors = [];
        this.zipCodeHints$ = new Observable();
        this.searchText$ = new Subject();
        this.lat = 60.168997;
        this.lng = 24.9433353;
        //shopName = new FormControl("",Validators.required);
        this.shopForm = this.fb.group({
            shopName: ["", [Validators.required, Validators.minLength(2)]],
            address: ["", Validators.required],
            city: ["", Validators.required],
            state: ["", Validators.required],
            zipCode: ["", Validators.required],
            telephone: ["", Validators.required],
            contact: ["", Validators.required]
        });
    }
    NewShopComponent.prototype.close = function () {
        this.showError = false;
    };
    NewShopComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.states = data.states;
        });
        this.zipCodeHints$ = this.shopForm.get('zipCode').valueChanges.pipe(debounceTime(500), filter(function (txt) {
            if (!txt || txt == "")
                return false;
            return txt.toString().length > 3;
        }), distinctUntilChanged(), switchMap(function (searchTXT) {
            return _this.zipcodeService.listZipcods(searchTXT);
        }));
    };
    NewShopComponent.prototype.searchZipCods = function (searchInp) {
        this.searchText$.next(searchInp);
    };
    NewShopComponent.prototype.onSubmit = function () {
        // TODO: Use EventEmitter with form value
        var _this = this;
        var shop = new Shop();
        shop = tslib_1.__assign({}, this.shopForm.value);
        shop.lat = this.lat;
        shop.lng = this.lng;
        this.shopsSrvc.createShope(shop).subscribe(function (res) {
            if (res['success'])
                _this.router.navigate(["../"], { relativeTo: _this.route });
            else {
                _this.showError = true;
                _this.errors = res['messages'];
            }
        });
    };
    NewShopComponent.prototype.displayFn = function (zipCode) {
        console.log(zipCode);
    };
    NewShopComponent.prototype.gotoShopList = function () {
        this.router.navigate(["../"], { relativeTo: this.route });
    };
    NewShopComponent.prototype.showForm = function () {
        return this.authService.isAccountActive();
    };
    NewShopComponent = tslib_1.__decorate([
        Component({
            selector: 'app-new-shop',
            templateUrl: './new-shop.component.html',
            styleUrls: ['./new-shop.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [StateService, AuthService, ShopsService, ActivatedRoute, MatSnackBar, Router, FormBuilder, GeocoderService, ZipcodeService])
    ], NewShopComponent);
    return NewShopComponent;
}());
export { NewShopComponent };
//# sourceMappingURL=new-shop.component.js.map