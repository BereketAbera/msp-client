import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";

import { Picture } from "../../model/picture";
import { UploadService } from "../../service/upload.service";

import { SaveConfirmationDialogComponent } from "../../shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "../../shared/save-progress/save-progress.component";
import { ImageCroppedEvent } from "ngx-image-cropper";
import Compressor from "compressorjs";

let uploadClass = null;

@Component({
  selector: "app-upload-img",
  templateUrl: "./upload-img.component.html",
  styleUrls: ["./upload-img.component.scss"],
})
export class UploadImgComponent implements OnInit {
  @ViewChild("file") file;

  imageChangedEvent: any = "";
  croppedImage: any = "";
  selectedImage;
  tempImg: any;

  showError: boolean = false;
  errors = [];
  imgPath;
  showImage: boolean = false;
  uploadForm = this.fb.group({
    name: ["", Validators.required],
    img: null,
  });
  formData = new FormData();
  loadingFile = false;
  loadingLocalImage = false;
  fileSelected = false;

  constructor(
    private uploadService: UploadService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    uploadClass = this;
  }

  ngOnInit() {}
  gotoGallery() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  chackFormValidity() {
    return true;
  }
  onSubmit() {
    // console.log(this.fileSelected);
    if (this.uploadForm.valid && this.fileSelected) {
      // this.formData.append("name", this.uploadForm.get("name").value);
      let value = this.uploadForm.value;
      this.formData.append("name", value["name"]);
      this.formData.append("img", value["img"]);

      const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
        width: "250px",
        height: "150px",
        data: { title: "", question: "do you want to upload this Image?" },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == "yes") {
          const progressDialog = this.dialog.open(SaveProgressComponent, {
            width: "300px",
            height: "200px",
          });
          this.uploadService.createImage(this.formData).subscribe(
            (res) => {
              if (res["success"]) {
                progressDialog.close();
                let snackBarRef = this.snackBar.open(
                  "Successfuly Uploaded File",
                  "Upload More",
                  {
                    duration: 2000,
                  }
                );
                snackBarRef.afterDismissed().subscribe(() => {
                  this.router.navigate(["../"], {
                    relativeTo: this.route,
                  });
                });
                snackBarRef.onAction().subscribe(() => {
                  this.showImage = false;
                  this.uploadForm.reset();
                });
                //this.router.navigate(["../"], { relativeTo: this.route });
              } else {
                progressDialog.close();
                this.showError = true;
                this.errors = res["messages"];
              }
            },
            (err) => {
              progressDialog.close();
            }
          );
        }
      });
    }
  }
  close() {
    this.showError = false;
  }

  fileChangeEvent(event: any): void {
    if (!event.target.files[0]) {
      return;
    }

    this.fileSelected = true;
    let name = event.target.files[0].name;
    if (name) {
      if (
        ["PNG", "JPG", "JPEG"].includes(
          name.split(".")[name.split(".").length - 1].toUpperCase()
        )
      ) {
        this.loadingLocalImage = true;
        this.imageChangedEvent = event;
      } else {
        this.loadingLocalImage = false;
        this.snackBar.open("The file type should be PNG or JPEG", "", {
          duration: 4000,
        });
      }
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.loadingLocalImage = false;
    if (event.width < 550 || event.height < 440) {
      let snackBarRef = this.snackBar.open(
        "Image is not large enough, Select a larger image.",
        "",
        {
          duration: 4000,
        }
      );
      this.imageChangedEvent = "";
      return;
    }
    this.croppedImage = event;
  }

  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {}

  closeModal() {
    uploadClass.imageChangedEvent = "";
  }

  imageLoad(event) {}

  saveImage() {
    this.tempImg = this.croppedImage.base64;
    let byteCharacters = atob(this.tempImg.split(",")[1]);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], { type: "image/jpeg" });

    this.compressImage(blob);
  }

  compressImage(image) {
    let setLocal = this.setLocalImage;
    let closeModal = this.closeModal;
    new Compressor(image, {
      quality: 0.7,
      minWidth: 550,
      maxWidth: 550,
      mimeType: "JPEG",
      success(result) {
        setLocal(result);
        uploadClass.uploadForm.get("img").setValue(result);
        closeModal();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  setLocalImage(blob) {
    var urlCreator = window.URL;
    var imageUrl = urlCreator.createObjectURL(blob);
    document.querySelector("#localImage")["src"] = imageUrl;
  }
}
