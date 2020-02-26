import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Picture } from '../../model/picture';
import { UploadService } from '../../service/upload.service';
import { SaveConfirmationDialogComponent } from '../../shared/save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveProgressComponent } from '../../shared/save-progress/save-progress.component';
var UploadImgComponent = /** @class */ (function () {
    function UploadImgComponent(uploadService, snackBar, dialog, route, router, fb) {
        this.uploadService = uploadService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.showError = false;
        this.errors = [];
        this.showImage = false;
        this.uploadForm = this.fb.group({
            name: ["", Validators.required],
            img: null,
        });
    }
    UploadImgComponent.prototype.ngOnInit = function () {
    };
    UploadImgComponent.prototype.gotoGallery = function () {
        this.router.navigate(["../"], { relativeTo: this.route });
    };
    UploadImgComponent.prototype.chackFormValidity = function () {
        return true;
    };
    UploadImgComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.file.nativeElement.files.length > 0) {
            var fileize = +((this.file.nativeElement.files[0].size / 1024) / 1024).toFixed(4);
            if (fileize <= 5) {
                if (this.chackFormValidity()) {
                    var picture_1 = new Picture();
                    picture_1 = tslib_1.__assign({}, this.uploadForm.value);
                    var dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
                        width: '300px',
                        height: '200px',
                        data: { title: "", question: "do you want to upload this Image?" }
                    });
                    dialogRef.afterClosed().subscribe(function (result) {
                        if (result == "yes") {
                            var progressDialogRef_1 = _this.dialog.open(SaveProgressComponent, {
                                width: '160px',
                                height: '180px',
                                data: { title: "", question: "" }
                            });
                            _this.uploadService.createImage(picture_1, _this.file.nativeElement.files).subscribe(function (res) {
                                if (res['success']) {
                                    progressDialogRef_1.close();
                                    var snackBarRef = _this.snackBar.open("Successfuly Uploaded File", "Upload More", {
                                        duration: 2000,
                                    });
                                    snackBarRef.afterDismissed().subscribe(function () {
                                        _this.router.navigate(["../"], { relativeTo: _this.route });
                                    });
                                    snackBarRef.onAction().subscribe(function () {
                                        _this.showImage = false;
                                        _this.uploadForm.reset();
                                    });
                                    //this.router.navigate(["../"], { relativeTo: this.route });
                                }
                                else {
                                    progressDialogRef_1.close();
                                    _this.showError = true;
                                    _this.errors = res['messages'];
                                }
                            }, function (err) {
                                progressDialogRef_1.close();
                            });
                        }
                    });
                }
            }
            else {
                alert("Image size is too big");
            }
        }
        else {
            alert("Please select image");
        }
    };
    UploadImgComponent.prototype.close = function () {
        this.showError = false;
    };
    UploadImgComponent.prototype.filePreviewHandler = function (event) {
        var _this = this;
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            //var dataURL = reader.result;
            _this.imgPath = reader.result;
            var file = event.target.files[0];
            _this.uploadForm.get('img').setValue({
                filetype: file.type,
                value: reader.result
            });
            _this.showImage = true;
        };
        reader.readAsDataURL(input.files[0]);
    };
    tslib_1.__decorate([
        ViewChild('file'),
        tslib_1.__metadata("design:type", Object)
    ], UploadImgComponent.prototype, "file", void 0);
    UploadImgComponent = tslib_1.__decorate([
        Component({
            selector: 'app-upload-img',
            templateUrl: './upload-img.component.html',
            styleUrls: ['./upload-img.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UploadService, MatSnackBar, MatDialog, ActivatedRoute, Router, FormBuilder])
    ], UploadImgComponent);
    return UploadImgComponent;
}());
export { UploadImgComponent };
//# sourceMappingURL=upload-img.component.js.map