import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";

import { UploadService } from "../../service/upload.service";

import { ImageCroppedEvent } from "ngx-image-cropper";
import Compressor from "compressorjs";

let uploadClass = null;

@Component({
  selector: "app-upload-img",
  templateUrl: "./upload-img.component.html",
  styleUrls: ["./upload-img.component.scss"],
})
export class UploadImgComponent implements OnInit {
  @ViewChild("imageInput") imageInput: ElementRef;

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
    console.log(this.uploadForm.valid && this.fileSelected);
    if (this.uploadForm.valid && this.fileSelected) {
      let value = this.uploadForm.value;
   
      this.formData.append("name", value["name"]);
      this.formData.append("img", value["img"]);
      this.loadingLocalImage = true;
      this.uploadService.createImage(this.formData).subscribe(
        (res) => {
          if (res["success"]) {
            this.loadingLocalImage = false;
            let snackBarRef = this.snackBar.open(
              "Successfuly Uploaded File",
              "",
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
            this.loadingLocalImage = false;
            this.showError = true;
            this.errors = res["messages"];
          }
        },
        (err) => {
          this.loadingLocalImage = false;
        }
      );
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
    this.imageInput.nativeElement.value = "";
    uploadClass.imageChangedEvent = "";
    this.fileSelected = false;
  }

  closeModalSave() {
    uploadClass.imageChangedEvent = "";
    // this.fileSelected = false;
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
    new Compressor(image, {
      quality: 0.7,
      minWidth: 550,
      maxWidth: 550,
      mimeType: "JPEG",
      success: (result) => {
        this.setLocalImage(result);
        uploadClass.uploadForm.get("img").setValue(result);
        this.closeModalSave();
      },
      error: (err) => {
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
