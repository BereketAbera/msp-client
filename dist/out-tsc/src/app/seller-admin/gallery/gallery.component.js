import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { UploadService } from '../../service/upload.service';
import { SaveConfirmationDialogComponent } from '../../shared/save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveProgressComponent } from '../../shared/save-progress/save-progress.component';
var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(snackBar, dialog, uploadService, router, route) {
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.uploadService = uploadService;
        this.router = router;
        this.route = route;
        this.picturesOdd = new Array();
        this.picturesEven = new Array();
        this.showError = false;
    }
    GalleryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.pictures = data.pictures;
            _this.prepareOddEvenPicture();
        });
    };
    GalleryComponent.prototype.prepareOddEvenPicture = function () {
        if (this.picturesEven.length > 0)
            this.picturesEven = [];
        if (this.picturesOdd.length > 0)
            this.picturesOdd = [];
        for (var x = 0; x < this.pictures.length; x++) {
            if (x === 0) {
                this.picturesEven.push(this.pictures[x]);
            }
            else if (x % 2 === 0) {
                this.picturesEven.push(this.pictures[x]);
            }
            else {
                this.picturesOdd.push(this.pictures[x]);
            }
        }
    };
    GalleryComponent.prototype.delete = function (picture) {
        var _this = this;
        var dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
            width: '220px',
            height: '180px',
            data: { title: "", question: "Do you want to delete this picture?" }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "yes") {
                var progressDialogRef_1 = _this.dialog.open(SaveProgressComponent, {
                    width: '260px',
                    height: '180px',
                    data: { title: "", question: "" }
                });
                _this.uploadService.removeImage(picture.id).subscribe(function (res) {
                    if (res['success']) {
                        progressDialogRef_1.close();
                        var snackBarRef = _this.snackBar.open("Successfuly Deleted", "", {
                            duration: 2000,
                        });
                        snackBarRef.afterDismissed().subscribe(function () {
                            _this.uploadService.listImages().subscribe(function (newPictures) {
                                _this.pictures = newPictures;
                                _this.prepareOddEvenPicture();
                            });
                            _this.router.navigate(["./"], { relativeTo: _this.route });
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
    };
    GalleryComponent.prototype.gotoUploadPage = function () {
        this.router.navigate(["./upldimg"], { relativeTo: this.route });
    };
    GalleryComponent = tslib_1.__decorate([
        Component({
            selector: 'app-gallery',
            templateUrl: './gallery.component.html',
            styleUrls: ['./gallery.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MatSnackBar, MatDialog, UploadService, Router, ActivatedRoute])
    ], GalleryComponent);
    return GalleryComponent;
}());
export { GalleryComponent };
//# sourceMappingURL=gallery.component.js.map