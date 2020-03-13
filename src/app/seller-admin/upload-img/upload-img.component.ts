import { Component, OnInit,ViewChild} from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import {Picture} from '../../model/picture';
import {UploadService} from '../../service/upload.service';

import { SaveConfirmationDialogComponent } from '../../shared/save-confirmation-dialog/save-confirmation-dialog.component';
import { SaveProgressComponent } from '../../shared/save-progress/save-progress.component';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit {

  @ViewChild('file') file;

  showError: boolean = false;
  errors = [];
  imgPath;
  showImage: boolean = false;
  uploadForm = this.fb.group({
    name: ["", Validators.required],
    img: null,

  });
  constructor(private uploadService:UploadService, public snackBar: MatSnackBar, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }
 
  ngOnInit() {
  }
  gotoGallery() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  chackFormValidity(){
    return true;
  }
  onSubmit() {
    
    if (this.file.nativeElement.files.length > 0) {
      var fileize = +((this.file.nativeElement.files[0].size/1024)/1024).toFixed(4);
      if(fileize <= 5){
       if (this.chackFormValidity()) {
        let picture = new Picture();
        picture = { ...this.uploadForm.value };
        console.log({...this.uploadForm.value})
        console.log(this.file.nativeElement.files)
        const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
          width: '300px',
          height: '200px',
          data: { title: "", question: "do you want to upload this Image?" }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result == "yes") {
            const progressDialogRef = this.dialog.open(SaveProgressComponent, {
              width: '160px',
              height:'180px',
              data: { title: "", question: "" }
            });
            this.uploadService.createImage(picture, this.file.nativeElement.files).subscribe(
              res => {
                if (res['success']) {
                  progressDialogRef.close();
                  let snackBarRef = this.snackBar.open("Successfuly Uploaded File", "Upload More", {
                    duration: 2000,
                  });
                  snackBarRef.afterDismissed().subscribe(() => {
                    this.router.navigate(["../"], { relativeTo: this.route });
                  });
                  snackBarRef.onAction().subscribe(() => {
                    this.showImage = false;
                    this.uploadForm.reset();
                  });
                  //this.router.navigate(["../"], { relativeTo: this.route });
                } else {
                  progressDialogRef.close();
                  this.showError = true;
                  this.errors = res['messages'];
                }
              },
              err => {
                progressDialogRef.close();
              }
            );
          }
        });

      }
    }else{
      alert("Image size is too big");
    }
    } else {
      alert("Please select image");
    }
  }
  close() {
    this.showError = false;
  }
  filePreviewHandler(event) {

    var input = event.target;
    var reader = new FileReader();
    reader.onload = () => {
      //var dataURL = reader.result;
      this.imgPath = reader.result;
      let file = event.target.files[0];
      this.uploadForm.get('img').setValue({
        filetype: file.type,
        value: reader.result
      });
      this.showImage = true;
    };
    reader.readAsDataURL(input.files[0]);
  }

}
