import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//const googleApi = "https://maps.googleapis.com/maps/api/geocode/json?";
//const googleApi = "https://maps.googleapis.com/maps/api/geocode/json?latlng=37.81595220000001,-103.26634790000003&result_type=postal_code&key=AIzaSyAUfjVz4uH_haKH7Bj6g3ua6IT6TD1jYgc";
//const apiKey = "AIzaSyAUfjVz4uH_haKH7Bj6g3ua6IT6TD1jYgc";
//const rsltType = "postal_code"; 
var GeocoderService = /** @class */ (function () {
    //const options = { params: new HttpParams().set('name', term) };
    function GeocoderService(http) {
        this.http = http;
        this.httpParams = new HttpParams();
        this.googleApi = "https://maps.googleapis.com/maps/api/geocode/json?";
        this.apiKey = "AIzaSyAUfjVz4uH_haKH7Bj6g3ua6IT6TD1jYgc";
        this.rsltType = "postal_code";
    }
    GeocoderService.prototype.getAddress = function (lat, lng) {
        var options = {
            params: new HttpParams().set("latlng", lat.toString() + "," + lng.toString())
                .set("key", this.apiKey),
        };
        return this.http.get(this.googleApi, options).pipe(map(this.getAddressInfo), catchError(this.handleError));
    };
    GeocoderService.prototype.getAddressInfo = function (resultAdrs) {
        var addresInfo = {
            state: "",
            city: "",
            zipCode: "",
            address: ""
        };
        if (resultAdrs.status == 'OK') {
            if (resultAdrs.results[1]) {
                addresInfo.address = resultAdrs.results[1].formatted_address;
                for (var i = 0; i < resultAdrs.results.length; i++) {
                    if (resultAdrs.results[i].types[0] === "postal_code") {
                        addresInfo.zipCode = resultAdrs.results[i].address_components[0].long_name;
                    }
                    else if (resultAdrs.results[i].types[0] === "administrative_area_level_2") {
                        addresInfo.city = resultAdrs.results[i].address_components[0].long_name;
                    }
                    else if (resultAdrs.results[i].types[0] === "administrative_area_level_1") {
                        addresInfo.state = resultAdrs.results[i].address_components[0].long_name;
                    }
                }
            }
        }
        return addresInfo;
    };
    GeocoderService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
    ;
    GeocoderService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], GeocoderService);
    return GeocoderService;
}());
export { GeocoderService };
//# sourceMappingURL=geocoder.service.js.map