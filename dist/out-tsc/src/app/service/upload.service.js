import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from '../../environments/environment';
import * as moment_ from 'moment';
var moment = moment_;
var uploadApi = environment.APIEndpoint + "glry";
var UploadService = /** @class */ (function () {
    function UploadService(http) {
        this.http = http;
        this.countSubject = new BehaviorSubject(0);
    }
    UploadService.prototype.createImage = function (picture, filesList) {
        var headers = new HttpHeaders();
        //this is the important step. You need to set content type as null
        headers.set('Content-Type', null);
        headers.set('Accept', "multipart/form-data");
        var params = new HttpParams();
        var formData = new FormData();
        for (var i = 0; i < filesList.length; i++) {
            formData.append('fileArray', filesList[i], filesList[i].name);
        }
        formData.append('name', picture.name);
        return this.http.post(uploadApi, formData, { params: params, headers: headers }).pipe(catchError(this.handleError));
    };
    UploadService.prototype.removeImage = function (pictureId) {
        return this.http.delete(uploadApi + "/" + pictureId).pipe(map(function (picture) {
            return picture;
        }), catchError(this.handleError));
    };
    UploadService.prototype.listImages = function () {
        var _this = this;
        return this.http.get(uploadApi).pipe(map(function (res) {
            _this.countSubject.next(res['count']);
            return res['rows'];
        }), catchError(this.handleError));
    };
    UploadService.prototype.handleError = function (error) {
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
    UploadService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UploadService);
    return UploadService;
}());
export { UploadService };
//# sourceMappingURL=upload.service.js.map